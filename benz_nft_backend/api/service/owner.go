package service

import (
    "benzNft/api/repository"
    "benzNft/models"
)

//OwnerService OwnerService struct
type OwnerService struct {
    repository repository.OwnerRepository
}

//NewOwnerService : returns the OwnerService struct instance
func NewOwnerService(r repository.OwnerRepository) OwnerService {
    return OwnerService{
        repository: r,
    }
}

//Save -> calls owner repository save method
func (p OwnerService) Save(owner models.Owner) error {
    return p.repository.Save(owner)
}

//FindAll -> calls owner repo find all method
func (p OwnerService) FindAll(owner models.Owner, keyword string) (*[]models.Owner, int64, error) {
    return p.repository.FindAll(owner, keyword)
}

// Update -> calls ownerrepo update method
func (p OwnerService) Update(owner models.Owner) error {
    return p.repository.Update(owner)
}

// Delete -> calls owner repo delete method
func (p OwnerService) Delete(id int64) error {
    var owner models.Owner
    owner.ID = id
    return p.repository.Delete(owner)
}

// Find -> calls owner repo find method
func (p OwnerService) Find(owner models.Owner) (models.Owner, error) {
    return p.repository.Find(owner)
}