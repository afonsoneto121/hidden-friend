package models

type User struct {
	ID       string   `json:"_id" bson:"_id,omitempty"`
	Name     string   `json:"name"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	WishList []string `json:"wishList"`
}

type Group struct {
	ID          string              `json:"_id" bson:"_id,omitempty"`
	Name        string              `json:"name"`
	Description string              `json:"description"`
	Admin       User                `json:"admin"`
	Private     bool                `json:"private"`
	Users       []User              `json:"users"`
	Matches     []map[string]string `json:"matches"`
}
