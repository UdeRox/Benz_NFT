package controller

import (
    "benzNft/api/service"
    "benzNft/models"
    "benzNft/util"
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
)

type OwnerController struct {
    service service.OwnerService
}

func NewOwnerController(s service.OwnerService) OwnerController {
    return OwnerController{
        service: s,
    }
}

func (p OwnerController) Getowner(ctx *gin.Context) {
    var owners models.Owner

    keyword := ctx.Query("keyword")

    data, total, err := p.service.FindAll(owners, keyword)

    if err != nil {
        util.ErrorJSON(ctx, http.StatusBadRequest, "Failed to find questions")
        return
    }
    respArr := make([]map[string]interface{}, 0, 0)

    for _, n := range *data {
        resp := n.ResponseMap()
        respArr = append(respArr, resp)
    }

    ctx.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Owner result set",
        Data: map[string]interface{}{
            "rows":       respArr,
            "total_rows": total,
        }})
}


// GetOwners : GetOwners controller
func (p OwnerController) GetOwners(ctx *gin.Context) {
    var owners models.Owner

    keyword := ctx.Query("keyword")

    data, total, err := p.service.FindAll(owners, keyword)

    if err != nil {
        util.ErrorJSON(ctx, http.StatusBadRequest, "Failed to find questions")
        return
    }
    respArr := make([]map[string]interface{}, 0, 0)

    for _, n := range *data {
        resp := n.ResponseMap()
        respArr = append(respArr, resp)
    }

    ctx.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Owner result set",
        Data: map[string]interface{}{
            "rows":       respArr,
            "total_rows": total,
        }})
}

// AddOwner : AddOwner controller
func (p *OwnerController) AddOwner(ctx *gin.Context) {
    var owner models.Owner
    ctx.ShouldBindJSON(&owner)

    err := p.service.Save(owner)
    if err != nil {
        util.ErrorJSON(ctx, http.StatusBadRequest, "Failed to create owner")
        return
    }
    util.SuccessJSON(ctx, http.StatusCreated, "Successfully Created Owner")
}

//GetOwner : get owner by id
func (p *OwnerController) GetOwner(c *gin.Context) {
    walletParam := c.Param("wallet")
    var owner models.Owner
    owner.WalletAddress = walletParam
    foundOwner, err := p.service.Find(owner)
    if err != nil {
        util.ErrorJSON(c, http.StatusNotFound, "Not a registered User!")
        return
    }
    response := foundOwner.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Result set of Owner",
        Data:    &response})

}

//DeleteOwner : Deletes Owner
func (p *OwnerController) DeleteOwner(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.ParseInt(idParam, 10, 64) //type conversion string to uint64
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, "id invalid")
        return
    }
    err = p.service.Delete(id)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, "Failed to delete Owner")
        return
    }
    response := &util.Response{
        Success: true,
        Message: "Deleted Sucessfully"}
    c.JSON(http.StatusOK, response)
}

//UpdateOwner : get update by id
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

