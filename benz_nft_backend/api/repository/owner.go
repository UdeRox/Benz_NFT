package repository

import (
	"benzNft/infrastructure"
	"benzNft/models"
)

// OwnerRepository represents the repository for managing owners.
type OwnerRepository struct {
	db infrastructure.Database
}

// NewOwnerRepository creates a new instance of OwnerRepository.
func NewOwnerRepository(db infrastructure.Database) *OwnerRepository {
	return &OwnerRepository{
		db: db,
	}
}

// Save saves the owner to the database.
func (or *OwnerRepository) Save(owner models.Owner) error {
	return or.db.DB.Create(&owner).Error
}

// Update updates the owner in the database.
func (or *OwnerRepository) Update(owner models.Owner) error {
	return or.db.DB.Save(&owner).Error
}
func (or *OwnerRepository) FindByNRICAndWalletAddress(nric, walletAddress string) (models.Owner, error) {
	var owner models.Owner
	err := or.db.DB.Debug().
		Model(&models.Owner{}).
		Joins("JOIN wallets ON owner.nric = wallets.nric").
		Where("owner.nric = ? AND wallets.address = ?", nric, walletAddress).
		Take(&owner).Error
	return owner, err
}

// Find finds the owner by wallet address.
func (or *OwnerRepository) Find(owner models.Owner) (models.Owner, error) {
	var owners models.Owner
	err := or.db.DB.Debug().
		Model(&models.Owner{}).
		Where(&owner).
		Take(&owners).Error
	return owners, err
}

func (or *OwnerRepository) FindByWalletAddress(walletAddress string) (models.Owner, error) {
	var owner models.Owner
	err := or.db.DB.Debug().
		Model(&models.Owner{}).
		Joins("JOIN wallets ON owner.nric = wallets.nric").
		Where("wallets.address = ?", walletAddress).
		Take(&owner).Error
	return owner, err
}

// UpdateOwnerWithWallets updates the owner's wallets.
func (or *OwnerRepository) UpdateOwnerWithWallets(nric string, wallets []models.Wallet) error {
	// Find the owner by NRIC
	var owner models.Owner
	if err := or.db.DB.Where("nric = ?", nric).First(&owner).Error; err != nil {
		return err
	}

	// Update the owner's wallets
	owner.Wallets = wallets

	// Save the changes
	if err := or.db.DB.Save(&owner).Error; err != nil {
		return err
	}

	return nil
}

// UpdateWalletReceipt updates the receipt for a wallet in the wallets table.
func (r *OwnerRepository) UpdateWalletReceipt(walletAddress, receipt string) error {
	result := r.db.DB.Model(models.Wallet{}).Where("address = ?", walletAddress).Update("receipt", receipt)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
