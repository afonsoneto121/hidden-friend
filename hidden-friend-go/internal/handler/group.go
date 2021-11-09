package handler

import (
	"afonso/hidden-friend/internal/models"
	"afonso/hidden-friend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /group/
func CreateNewGroup(c *gin.Context) {
	var newGroup *models.Group

	if err := c.BindJSON(&newGroup); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Error creating new group"})
	}

	services.CreateNewGroup(newGroup)

	c.IndentedJSON(http.StatusCreated, newGroup)

}

// PUT /group/:id
func AddPersonInGroup(c *gin.Context) {
	var userToAdd models.User
	idGroup := c.Param("id")

	if err := c.BindJSON(&userToAdd); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Error add person in group"})
	}

	if err := services.AddPersonInGroup(idGroup, userToAdd); err != nil {
		c.IndentedJSON(http.StatusBadGateway, gin.H{"message": "Error add person in group"})
	} else {
		c.IndentedJSON(http.StatusNoContent, userToAdd)

	}

}

// PUT /group/:id/toggle
func ToggleGroup(c *gin.Context) {
	var user models.User

	idGroup := c.Param("id")
	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Error"})
		return
	}

	err := services.ToggleGroup(idGroup, user)

	if err != nil {
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "User isn't authorized"})
		return
	}

	c.IndentedJSON(http.StatusNoContent, gin.H{"message": "Toggle group"})
}

// PUT /group/:id/generate
func GenerateMatches(c *gin.Context) {
	var user models.User //group's admin user

	idGroup := c.Param("id")
	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Error"})
		return
	}

	err := services.GenerateMatches(idGroup, user)

	if err != nil {
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "User isn't authorized"})
		return
	}

	c.IndentedJSON(http.StatusNoContent, gin.H{"message": "Group generated"})

}

// GET /group/
func GetAllGroups(c *gin.Context) {
	groups := services.GetAllGroups()

	c.IndentedJSON(http.StatusOK, groups)
}

// GET /group/:id
func GetGroupByID(c *gin.Context) {
	id := c.Param("id")

	group, err := services.GetGroupByID(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Group not found"})
	} else {
		c.IndentedJSON(http.StatusOK, group)
	}
}

// GET /group/:id/users
func GetGroupUsers(c *gin.Context) {
	id := c.Param("id")
	users, err := services.GetUserInGroup(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Group not found"})
	} else {
		c.IndentedJSON(http.StatusOK, users)
	}

}

// GET /group/:id/matches
func GetGroupMatches(c *gin.Context) {}
