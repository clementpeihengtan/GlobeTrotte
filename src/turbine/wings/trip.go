// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip.wings)
// and run the following command:
// plz build //src/wings/...

package wings

import (
	"time"
)

// Trip - Trip - All information of a single trip.
type Trip struct {
	ID             int                  `json:"id"`
	UserID         int                  `json:"user_id"`
	Name           string               `json:"name"`
	Cities         []City               `json:"cities"`
	Days           []Day                `json:"days"`
	Description    string               `json:"description"`
	TimeCreated    time.Time            `json:"time_created"`
	LastUpdated    time.Time            `json:"last_updated"`
	Private        bool                 `json:"private"`
	SharedWith     []UserAccessLevel    `json:"shared_with"`
}

// GetID (istruct) - Returns the trip ID.
func (trip Trip) GetID() int {
	return trip.ID
}

// SetID (istruct) - Sets the trip ID.
func (trip *Trip) SetID(id int) {
	trip.ID = id
}

// Trips - An array of Trip
type Trips []Trip
