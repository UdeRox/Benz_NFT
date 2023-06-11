package service

import (
	"benzNft/api/repository"
	"benzNft/models"
)

// OwnerService OwnerService struct
type OwnerService struct {
	repository repository.OwnerRepository
}

// NewOwnerService : returns the OwnerService struct instance
func NewOwnerService(r repository.OwnerRepository) OwnerService {
	return OwnerService{
		repository: r,
	}
}

// Save -> calls owner repository save method
func (p OwnerService) Save(owner models.Owner) error {
	return p.repository.Save(owner)
}

// Update -> calls ownerrepo update method
func (p OwnerService) Update(owner models.Owner) error {
	return p.repository.Update(owner)
}


// Find -> calls owner repo find method
func (p OwnerService) Find(owner models.Owner) (models.Owner, error) {
	return p.repository.Find(owner)
}
