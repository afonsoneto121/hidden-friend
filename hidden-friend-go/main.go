package main

import (
	"afonso/hidden-friend/internal/handler"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	user := router.Group("/user")
	{
		user.GET("/", handler.GetAllUsers)
		user.GET("/:id", handler.GetUserById)
		user.POST("/", handler.AddNewUser)

	}

	group := router.Group("/group")
	{
		group.GET("/", handler.GetAllGroups)
		group.GET("/:id", handler.GetGroupByID)
		group.GET("/:id/users", handler.GetGroupMatches)
		group.GET("/:id/matches", handler.GetAllUsers)

		group.POST("/", handler.CreateNewGroup)

		group.PUT("/:id", handler.AddPersonInGroup)
		group.PUT("/:id/toggle", handler.ToggleGroup)
		group.PUT("/:id/generate", handler.GenerateMatches)
	}
	router.Run()

}
