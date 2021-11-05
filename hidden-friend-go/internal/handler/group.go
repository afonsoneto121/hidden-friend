package handler

import "github.com/gin-gonic/gin"

// POST /group/
func CreateNewGroup(c *gin.Context) {}

// PUT /group/:id
func AddPersonInGroup(c *gin.Context) {}

// PUT /group/:id/toggle
func ToggleGroup(c *gin.Context) {}

// PUT /group/:id/generate
func GenerateMatches(c *gin.Context) {}

// GET /group/
func GetAllGroups(c *gin.Context) {}

// GET /group/:id
func GetGroupByID(c *gin.Context) {}

// GET /group/:id/users
func GetGroupUsers(c *gin.Context) {}

// GET /group/:id/matches
func GetGroupMatches(c *gin.Context) {}
