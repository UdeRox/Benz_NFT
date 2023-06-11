package service

import (
	"benzNft/api/repository"
	"benzNft/models"
	"github.com/gin-gonic/gin"
)

// OwnerService represents the service for managing owners.
type OwnerService struct {
	repository *repository.OwnerRepository
}

// NewOwnerService creates a new instance of OwnerService.
func NewOwnerService(r *repository.OwnerRepository) *OwnerService {
	return &OwnerService{
		repository: r,
	}
}

// Save saves the owner to the repository.
func (os *OwnerService) Save(owner models.Owner) error {
	return os.repository.Save(owner)
}

func (os *OwnerService) GetOwner(nric, walletAddress string) (models.Owner, error) {
	if nric == "" {
		return os.repository.FindByWalletAddress(walletAddress)
	} else {
		return os.repository.FindByNRICAndWalletAddress(nric, walletAddress)
	}
}

// Update updates the owner in the repository.
func (os *OwnerService) Update(owner models.Owner) error {
	return os.repository.Update(owner)
}

// Find finds the owner in the repository.
func (os *OwnerService) Find(owner models.Owner) (models.Owner, error) {
	return os.repository.Find(owner)
}

//Find Owner base on the wallet address 
func (os *OwnerService) FindByWalletAddress(walletAddress string) (models.Owner, error) {
	return os.repository.FindByWalletAddress(walletAddress)
}
func (os *OwnerService) FindByNRICAndWalletAddress(nric, walletAddress string) (models.Owner, error) {
	return os.repository.FindByNRICAndWalletAddress(nric, walletAddress)
}

// UpdateOwner updates the owner's wallet address.
func (os *OwnerService) UpdateOwner(owner models.Owner, c *gin.Context) error {
	foundOwner, err := os.repository.Find(owner)
	if err != nil {
		return err
	}

	err = c.ShouldBindJSON(&foundOwner)
	if err != nil {
		return err
	}

	err = os.repository.UpdateOwnerWithWallets(foundOwner.NRIC, foundOwner.Wallets)
	if err != nil {
		return err
	}

	return nil
}

// UpdateWalletReceipt updates the receipt for a wallet in the wallets table.
func (os *OwnerService) UpdateWalletReceipt(walletAddress, receipt string) error {
	return os.repository.UpdateWalletReceipt(walletAddress, receipt)
}
