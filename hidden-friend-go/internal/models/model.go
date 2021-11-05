package model

type User struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	WishList []string `json:"wishList"`
}

type Group struct {
	ID          string              `json:"id"`
	Name        string              `json:"name"`
	Description string              `json:"description"`
	Admin       User                `json:"admin"`
	Private     bool                `json:"private"`
	Users       []User              `json:"users"`
	Matches     []map[string]string `json:"matches"`
}
