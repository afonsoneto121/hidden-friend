package auth

import (
	"afonso/hidden-friend/internal/models"
	"afonso/hidden-friend/internal/services"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// POST /login
func Login(c *gin.Context) {
	var user *models.User

	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Error user struct"})
		return
	}

	userLogin, err := services.Login(*user)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.Username != userLogin.Username && user.Password != userLogin.Password {
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "Unauthorized user"})
		return
	}
	token, err := createToken(user)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, gin.H{"message": "Erro in generate token JWT"})
		return
	}

	c.SetCookie("key", token, 900, "/", "", false, true)
	c.IndentedJSON(http.StatusOK, gin.H{"token": token, "user": userLogin})
}

func createToken(user *models.User) (string, error) {
	os.Setenv("ACCESS_TOKEN", "teste-1234") // This should be in an environment variable
	atClaims := jwt.MapClaims{}

	atClaims["authorized"] = true
	atClaims["user_id"] = user.ID
	atClaims["user_name"] = user.Name
	//atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	atClaims["exp"] = time.Now().Add(time.Minute * 60).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

	token, err := at.SignedString([]byte(os.Getenv("ACCESS_TOKEN")))
	if err != nil {
		return "", err
	}
	return token, nil
}

func extractToken(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")

	strArr := strings.Split(bearerToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func verifyToken(r *http.Request) (*jwt.Token, error) {
	tokenStr := extractToken(r)
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_TOKEN")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func TokenValid(r *http.Request) error {
	token, err := verifyToken(r)
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return err
	}
	return nil
}
