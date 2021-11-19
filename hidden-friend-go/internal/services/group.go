package services

import (
	"context"
	"errors"
	"fmt"

	"afonso/hidden-friend/config"
	"afonso/hidden-friend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateNewGroup(group *models.Group) {
	client := config.New()

	coll := client.Database("hidden-friend").Collection("group")

	res, err := coll.InsertOne(context.TODO(), group)

	if err != nil {
		return
	}

	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		group.ID = oid.Hex()
	}

}

func AddPersonInGroup(idGroup string, userToAdd models.User) error {
	client := config.New()

	coll := client.Database("hidden-friend").Collection("group")
	fmt.Println(idGroup)

	objectId, _ := primitive.ObjectIDFromHex(idGroup)

	filter := bson.M{"_id": objectId}

	update := bson.M{"$push": bson.M{"users": bson.M{"$each": []models.User{userToAdd}}}}

	res := coll.FindOneAndUpdate(context.TODO(), filter, update)

	if res.Err() != nil {
		fmt.Println(res.Err())
		return res.Err()
	}

	return nil
}

func ToggleGroup(idGroup string, user models.User) error {
	client := config.New()

	coll := client.Database("hidden-friend").Collection("group")

	objectIdGroup, _ := primitive.ObjectIDFromHex(idGroup)

	filter := bson.M{"_id": objectIdGroup}

	var groupFound models.Group
	if result := coll.FindOne(context.TODO(), filter).Decode(&groupFound); result != nil {
		return errors.New("Error: user invalid")
	}

	if user.ID != groupFound.Admin.ID {
		return errors.New("Error: user invalid")
	}

	update := bson.M{"$set": bson.M{"private": !groupFound.Private}}
	res := coll.FindOneAndUpdate(context.TODO(), filter, update)

	if res.Err() != nil {
		return res.Err()
	}
	return nil
}

func GetAllGroups() []models.Group {
	client := config.New()
	coll := client.Database("hidden-friend").Collection("group")
	opts := options.Find().SetProjection(bson.M{"users.password": 0, "admin.password": 0})
	cur, err := coll.Find(context.TODO(), bson.D{}, opts)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	var groups []models.Group

	if err := cur.All(context.TODO(), &groups); err != nil {
		fmt.Println(err)
		return nil
	}
	return groups
}

func GetGroupByID(id string) (models.Group, error) {
	client := config.New()
	coll := client.Database("hidden-friend").Collection("group")

	objectId, _ := primitive.ObjectIDFromHex(id)
	var group models.Group
	filter := bson.D{{"_id", objectId}}
	opts := options.FindOne().SetProjection(bson.M{"users.password": 0, "admin.password": 0})
	err := coll.FindOne(context.TODO(), filter, opts).Decode(&group)

	return group, err
}

func GetUserInGroup(id string) ([]models.User, error) {
	gr, err := GetGroupByID(id)
	return gr.Users, err
}

func GenerateMatches(idGroup string, user models.User) error {
	client := config.New()

	coll := client.Database("hidden-friend").Collection("group")

	objectIdGroup, _ := primitive.ObjectIDFromHex(idGroup)

	filter := bson.M{"_id": objectIdGroup}

	var groupFound models.Group
	if result := coll.FindOne(context.TODO(), filter).Decode(&groupFound); result != nil {
		return errors.New("Error: user invalid")
	}

	if user.ID != groupFound.Admin.ID {
		return errors.New("Error: user invalid")
	}

	//	update := bson.M{"$set": bson.M{"private": !groupFound.Private}}
	//Loging for gener matches
	return nil
}
