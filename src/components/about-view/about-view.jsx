import Row from "react-bootstrap/Row"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "./Table";
import "./App.css";

  
  export const AboutView = ({ about }) => {
    const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: "App Commands",
          // First group columns
          columns: [
            {
              Command: "Welcome Message",
              URL: "/",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "Welcome Message"
            },
            {
              Command: "USER GUIDE OF APP",
              URL: "/api/about",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "A webpage on how to use the app"
            },
            {
              COMMAND: "USER GUIDE OF APP",
              URL: "/api/about",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "A webpage on how to use the app"
            },
            {
              COMMAND: "Full Movie List A-Z",
              URL: "/api/movies",
              ACTION: "GET",
              INSTRUCTIONS: "Login and Copy Bearer Token (User info) to Authenticate Bearer Token then change URL to view films in database",
              JSON: "NA",
              DISPLAY: "See a List of Movies A-Z or error message"
            },
            {
              COMMAND: "Logging into Your Account",
              URL: "/api/user/login/",
              ACTION: "POST",
              INSTRUCTIONS: "API platform select body raw JSON then in body fill info in format below",
              JSON: [{
                "Username": "Brian",
                "Password": "MoneyWallet#1"
              }],
              DISPLAY: "Database User info and Database"
            },
            {
              COMMAND: "Film Search by Title",
              URL: "/api/movies/title/:label",
              ACTION: "GET",
              INSTRUCTIONS: "Login and Copy Bearer Token (User info) to Authenticate Bearer Token then change URL to view films by title",
              JSON: "NA",
              DISPLAY: "See one movie by Title or error message"
            },
            {
              COMMAND: "Film by Release Year",
              URL: "/api/movies/release/:year",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "A list of films by release film year displayed or error message given"
            },
            {
              COMMAND: "Films filtered by age appropriate audience",
              URL: "/api/movies/rated/:audience",
              INSTRUCTIONS: "URL",
              ACTION: "GET",
              JSON: "NONE",
              DISPLAY: "Films filter by rating displayed or error message"
            },
            {
              COMMMAND: "Rotten Tomatoes Percentage of Film",
              URL: "/api/movies/rating/:percentage",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "List of films filter by Rotten Tomatoes Percentage or error message"
            },
            {
              COMMAND: "Genre of film by category",
              URL: "/api/movies/genre/:genreName",
              INSTRUCTIONS: "URL",
              JSON: "NONE",
              DISPLAY: "Films filtered by category are displayed or error message"
            },
            {
              COMMAND: "Film by Director",
              URL: "/api/movies/director/:name",
              ACTION: "GET",
              INSTRUCTIONS: "URL",
              JSON: "NA",
              DISPLAY: "List of films filtered by director name or error message"
            },
            {
              COMMAND: "User Registration",
              URL: "/api/user",
              ACTION: "POST",
              INSTRUCTIONS: "Create User in body of raw JSON, NOTE - date is in decending order from large to small time block",
              JSON: [{
                "Username": "USERNAME",
                "Password": "PASSWORD",
                "Email": "EMAIL",
                "Birthday": "####-##-##",
              }],
              DISPLAY: " Display New User info or message already exists if already added"
            },
            {
              COMMMAND: "User account information changed",
              URL: "/api/user/:id",
              ACTION: "PUT",
              INSTRUCTIONS: "Login and Copy Bearer Token (User info) to Authenticate then put id in :idenitity of URL and then add info in JSON body formate below also NOTE - Date Large to Small time blocks",
              JSON: [{
                "Username": "USERNAME",
                "Password": "PASSWORD",
                "Email": "EMAIL",
                "Birthday": "####-##-##",
              }],
              DISPLAY: "UPDATED User information or message indicating info already updated"
            },
            {
              COMMAND: "Allows user to delete account",
              URL: "/api/user/:identity",
              ACTION: "DELETE",
              INSTRUCTIONS: "First Login In then with authication then change URL to delete user URL with user id in :identity. Before submitting create a JSON body of movie to delete as seen in example below",
              JSON: [{ "Username": "Name of Users" }],
              DISPLAY: "Text confirming user account delected"
            },
            {
              COMMAND: "User can add Favorite Movie",
              URL: "/api/user/favorite/:identity/:add",
              ACTION: "POST",
              INTRUCTIONS: "Login and Copy Bearer Token (User info) to Authenticate Bearer Token then change URL wiht api/users/ then add user id and film id then POST.",
              JSON: "NA",
              DISPLAY: "Message that film has been added or error message"
            },
            {
              COMMAND: "User can delete Favorite Movie",
              URL: "/api/user/favorite/:identity/:remove",
              ACTION: "DELETE",
              INSTRUCTIONS: "Login and Copy Bearer Token (User info) to Authenticate Bearer Token then change URL wiht api/users/ then add user id and film id then DELETE.",
              JSON: "NA",
              DISPLAY: "Message that film has been added or error message"
            }
          ],
        },
      ]
    )
  };

