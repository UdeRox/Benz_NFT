package controller

import (
	"benzNft/api/service"
	"benzNft/models"
	"benzNft/util"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type OwnerController struct {
	service service.OwnerService
}

func NewOwnerController(s service.OwnerService) OwnerController {
	return OwnerController{
		service: s,
	}
}

// AddOwner : AddOwner controller
func (p *OwnerController) AddOwner(ctx *gin.Context) {
	var owner models.Owner
	ctx.ShouldBindJSON(&owner)

	err := p.service.Save(owner)
	if err != nil {
		util.ErrorJSON(ctx, http.StatusBadRequest, "NRIC already registered with another Wallet!")
		return
	}
	util.SuccessJSON(ctx, http.StatusCreated, "Successfully Created Owner")
}

// GetOwner : get owner by wallet address
func (p *OwnerController) GetOwner(c *gin.Context) {
	walletParam := c.Param("wallet")
	var owner models.Owner
	owner.WalletAddress = walletParam
	foundOwner, err := p.service.Find(owner)
	if err != nil {
		util.ErrorJSON(c, http.StatusNotFound, "NRIC not registered!")
		return
	}
	response := foundOwner.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Result set of Owner",
		Data:    &response})

}

// UpdateOwner : get update by id
func (p OwnerController) UpdateOwner(ctx *gin.Context) {
	idParam := ctx.Param("id")

	id, err := strconv.ParseInt(idParam, 10, 64)

	if err != nil {
		util.ErrorJSON(ctx, http.StatusBadRequest, "id invalid")
		return
	}
	var owner models.Owner
	owner.ID = id

	ownerRecord, err := p.service.Find(owner)

	if err != nil {
		util.ErrorJSON(ctx, http.StatusBadRequest, "Owner with given id not found")
		return
	}
	ctx.ShouldBindJSON(&ownerRecord)

	if err := p.service.Update(ownerRecord); err != nil {
		util.ErrorJSON(ctx, http.StatusBadRequest, "Failed to store Owner")
		return
	}
	response := ownerRecord.ResponseMap()

	ctx.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Updated Owner",
		Data:    response,
	})
}
