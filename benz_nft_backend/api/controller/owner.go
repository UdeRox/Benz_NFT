package controller

import (
	"benzNft/api/service"
	"benzNft/models"
	"benzNft/util"
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
)

// OwnerController represents the controller for managing owners.
type OwnerController struct {
	service *service.OwnerService
}

// NewOwnerController creates a new instance of OwnerController.
func NewOwnerController(s *service.OwnerService) *OwnerController {
	return &OwnerController{
		service: s,
	}
}

// AddOwner creates a new owner.
func (oc *OwnerController) AddOwner(c *gin.Context) {
	var owner models.Owner
	c.ShouldBindJSON(&owner)

	// Check if owner already exists
	existingOwner, err := oc.service.Find(owner)
	if err == nil {
		// Owner already exists, return the existing owner
		response := existingOwner.ResponseMap()
		c.JSON(http.StatusOK, &util.Response{
			Success: true,
			Message: "Owner already exists",
			Data:    response,
		})
		return
	}

	err = oc.service.Save(owner)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, "NRIC already registered with another Wallet!")
		return
	}
	util.SuccessJSON(c, http.StatusCreated, "Successfully Created Owner")
}

// GetOwner retrieves the owner by wallet address.
func (oc *OwnerController) GetOwner(c *gin.Context) {
	walletParam := c.Query("wallet")
	nricParam := c.Query("nric")
	foundOwner, err := oc.service.GetOwner(nricParam, walletParam)
	if err != nil {
		util.ErrorJSON(c, http.StatusNotFound, "Invalid NRIC or Wallet Address!")
		return
	}

	response := foundOwner.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Result set of Owner",
		Data:    response,
	})
}

// UpdateOwner updates the owner by NRIC.
func (oc *OwnerController) UpdateOwner(c *gin.Context) {
	nricParam := c.Param("nric")
	var owner models.Owner
	owner.NRIC = nricParam

	err := oc.service.UpdateOwner(owner, c)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, "Failed to update Owner")
		return
	}

	response := owner.ResponseMap()
	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Updated Owner",
		Data:    response,
	})
}

func (oc *OwnerController) UpdateMintedReceipt(c *gin.Context) {
	var payload struct {
		WalletAddress string `json:"wallet"`
		Receipt       string `json:"receipt"`
	}
	c.ShouldBindJSON(&payload)

	err := oc.service.UpdateWalletReceipt(payload.WalletAddress, payload.Receipt)
	if err != nil {
		util.ErrorJSON(c, http.StatusInternalServerError, "Failed to update receipt for wallet")
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Receipt updated successfully")
}
