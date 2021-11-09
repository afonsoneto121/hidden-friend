package services

import (
	"context"
	"log"
	"time"

	"afonso/hidden-friend/config"
	"afonso/hidden-friend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(user *models.User) {
	client := config.New()

	coll := client.Database("hidden-friend").Collection("users")

	res, err := coll.InsertOne(context.TODO(), user)

	if err != nil {
		log.Fatal("Erro ", err)
	}

	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		user.ID = oid.Hex()
	}

}

func GetAllUsers() []models.User {
	users := []models.User{}

	client := config.New()
	coll := client.Database("hidden-friend").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	cur, err := coll.Find(ctx, bson.D{})

	if err != nil {
		log.Fatal("Erro ", err)
	}

	if err = cur.All(ctx, &users); err != nil {
		log.Fatal("Erro ", err)
	}

	return users
}

func GetUserById(id string) (models.User, error) {
	client := config.New()
	coll := client.Database("hidden-friend").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	var user models.User
	objectId, _ := primitive.ObjectIDFromHex(id)

	err := coll.FindOne(ctx, bson.M{"_id": objectId}).Decode(&user)

	return user, err
}
