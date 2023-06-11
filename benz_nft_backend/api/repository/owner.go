package repository

import (
	"benzNft/infrastructure"
	"benzNft/models"
)

// OwnerRepository -> OwnerRepository
type OwnerRepository struct {
	db infrastructure.Database
}

// NewOwnerRepository : fetching database
func NewOwnerRepository(db infrastructure.Database) OwnerRepository {
	return OwnerRepository{
		db: db,
	}
}

// Save -> Method for saving owner to database
func (p OwnerRepository) Save(owner models.Owner) error {
	return p.db.DB.Create(&owner).Error
}

// Update -> Method for updating Owner
func (p OwnerRepository) Update(owner models.Owner) error {
	return p.db.DB.Save(&owner).Error
}

// Find -> Method for fetching owner by id
func (p OwnerRepository) Find(owner models.Owner) (models.Owner, error) {
	var owners models.Owner
	err := p.db.DB.
		Debug().
		Model(&models.Owner{}).
		Where(&owner).
		Take(&owners).Error
	return owners, err
}
