package models

import (
	"time"
)

type Owner struct {
	ID            int64     `gorm:"primary_key;auto_increment" json:"id"`
	NRIC          string    `gorm:"size:200;unique" json:"nric"`
	WalletAddress string    `gorm:"size:3000" json:"walletAddress"`
	CreatedAt     time.Time `json:"created_at,omitempty"`
	UpdatedAt     time.Time `json:"updated_at,omitempty"`
}

// type WalletAddress struct {
// 	ID        int64     `gorm:"primary_key;auto_increment" json:"id"`
// 	OwnerID   int64     `gorm:"index" json:"owner_id"`
// 	Address   string    `gorm:"size:3000" json:"address"`
// 	CreatedAt time.Time `json:"created_at,omitempty"`
// 	UpdatedAt time.Time `json:"updated_at,omitempty"`
// }

func (owner *Owner) TableName() string {
	return "owner"
}

// func (address *WalletAddress) TableName() string {
// 	return "addresses"
// }

func (owner *Owner) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	resp["id"] = owner.ID
	resp["nrice"] = owner.NRIC
	resp["walletAddress"] = owner.WalletAddress
	resp["created_at"] = owner.CreatedAt
	resp["updated_at"] = owner.UpdatedAt
	return resp
}

// func Migrate(db *gorm.DB) error {
// 	err := db.AutoMigrate(&Owner{}, &WalletAddress{})
// 	if err != nil {
// 		return err
// 	}

// 	// Add foreign key constraint to addresses table
// 	err = db.Exec("ALTER TABLE addresses ADD CONSTRAINT addresses_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES owners (id);").Error
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }
