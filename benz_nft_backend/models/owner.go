package models

import (
	"time"
)

type Owner struct {
	ID        int64       `gorm:"primary_key;auto_increment" json:"id"`
	NRIC      string      `gorm:"size:200;unique" json:"nric"`
	Wallets   []Wallet    `gorm:"foreignKey:NRIC;references:NRIC" json:"wallets"`
	CreatedAt time.Time   `json:"created_at,omitempty"`
	UpdatedAt time.Time   `json:"updated_at,omitempty"`
}

func (owner *Owner) TableName() string {
	return "owner"
}

func (owner *Owner) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	resp["id"] = owner.ID
	resp["nric"] = owner.NRIC
	resp["created_at"] = owner.CreatedAt
	resp["updated_at"] = owner.UpdatedAt

	wallets := make([]Wallet, len(owner.Wallets))
	for i, _ := range owner.Wallets {
		wallets[i] = owner.Wallets[i]
	}
	resp["wallets"] = wallets
	return resp
}
type Wallet struct {
	ID        int64     `gorm:"primary_key;auto_increment" json:"id"`
	NRIC      string    `gorm:"index" json:"nric"`
	Address   string    `gorm:"unique" json:"address"`
	Receipt   string    `json:"receipt"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

func (wallet *Wallet) TableName() string {
	return "wallets"
}
