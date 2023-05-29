package repository
import (
    "benzNft/infrastructure"
    "benzNft/models"
)

//OwnerRepository -> OwnerRepository
type OwnerRepository struct {
    db infrastructure.Database
}

// NewOwnerRepository : fetching database
func NewOwnerRepository(db infrastructure.Database) OwnerRepository {
    return OwnerRepository{
        db: db,
    }
}

//Save -> Method for saving owner to database
func (p OwnerRepository) Save(owner models.Owner) error {
    return p.db.DB.Create(&owner).Error
}

//FindAll -> Method for fetching all owners from database
func (p OwnerRepository) FindAll(owner models.Owner, keyword string) (*[]models.Owner, int64, error) {
    var owners []models.Owner
    var totalRows int64 = 0

    queryBuider := p.db.DB.Order("created_at desc").Model(&models.Owner{})

    // Search parameter
    if keyword != "" {
        queryKeyword := "%" + keyword + "%"
        queryBuider = queryBuider.Where(
            p.db.DB.Where("owner.title LIKE ? ", queryKeyword))
    }

    err := queryBuider.
        Where(owner).
        Find(&owners).
        Count(&totalRows).Error
    return &owners, totalRows, err
}

//Update -> Method for updating Owner
func (p OwnerRepository) Update(owner models.Owner) error {
    return p.db.DB.Save(&owner).Error
}

//Find -> Method for fetching owner by id
func (p OwnerRepository) Find(owner models.Owner) (models.Owner, error) {
    var owners models.Owner
    err := p.db.DB.
        Debug().
        Model(&models.Owner{}).
        Where(&owner).
        Take(&owners).Error
    return owners, err
}

//Delete Deletes Owner
func (p OwnerRepository) Delete(owner models.Owner) error {
    return p.db.DB.Delete(&owner).Error
}