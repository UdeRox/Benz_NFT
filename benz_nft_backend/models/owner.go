package models
import "time"

type Owner struct {
	ID 				int64 	  `gorm:"primary_key;auto_increment" json:"id"`
	NRIC     		string    `gorm:"size:200" json:"nric"`
    WalletAddress 	string    `gorm:"size:3000" json:"walletAddress" `
    CreatedAt 		time.Time `json:"created_at,omitempty"`
    UpdatedAt 		time.Time `json:"updated_at,omitempty"`		
}

func (owner *Owner) TableName() string {
    return "owner"
}

func (owner *Owner) ResponseMap() map[string]interface{} {
    resp := make(map[string]interface{})
    resp["id"] = owner.ID
    resp["nrice"] = owner.NRIC
    resp["walletAddress"] = owner.WalletAddress
    resp["created_at"] = owner.CreatedAt
    resp["updated_at"] = owner.UpdatedAt
    return resp
}
