package handler

import (
	"afonso/hidden-friend/internal/models"
	"afonso/hidden-friend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /user
func AddNewUser(c *gin.Context) {
	var newUser models.User
	err := c.BindJSON(&newUser)
	if err != nil {
		return
	}
	services.CreateUser(&newUser)

	c.IndentedJSON(http.StatusCreated, newUser)
}

// GET /user
func GetAllUsers(c *gin.Context) {
	users := services.GetAllUsers()
	c.IndentedJSON(http.StatusOK, users)
}

// GET /user/:id
func GetUserById(c *gin.Context) {
	id := c.Param("id")
	user, err := services.GetUserById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
	} else {
		c.IndentedJSON(http.StatusOK, user)
	}
}
