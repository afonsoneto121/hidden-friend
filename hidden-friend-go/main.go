package main

import (
	"afonso/hidden-friend/internal/handler"
	"net/http"

	"afonso/hidden-friend/internal/handler/auth"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := auth.TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Next()
	}
}
func main() {

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.POST("/login", auth.Login)
	user := router.Group("/user", AuthMiddleware())
	{
		user.GET("/", handler.GetAllUsers)
		user.GET("/:id", handler.GetUserById)
		user.POST("/", handler.AddNewUser)

	}

	group := router.Group("/group", AuthMiddleware())
	{
		group.GET("/", handler.GetAllGroups)
		group.GET("/:id", handler.GetGroupByID)
		group.GET("/:id/users", handler.GetGroupUsers)
		group.GET("/:id/matches", handler.GetAllUsers)

		group.POST("/", handler.CreateNewGroup)

		group.PUT("/:id", handler.AddPersonInGroup)
		group.PUT("/:id/toggle", handler.ToggleGroup)
		group.PUT("/:id/generate", handler.GenerateMatches)
	}
	router.Run()

}
