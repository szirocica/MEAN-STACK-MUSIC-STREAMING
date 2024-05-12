import { Router, Request, Response, NextFunction } from "express";
import { PassportStatic } from "passport";
import { User } from "../model/User";
import { Music } from "../model/Music";
import { Album } from "../model/Album";

export const configureRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {

  // User management

  router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (error: string | null, user: typeof User) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          if (!user) {
            res.status(400).send("User not found.");
          } else {
            req.login(user, (err: string | null) => {
              if (err) {
                console.log(err);
                res.status(500).send("Internal server error.");
              } else {
                res.status(200).send(user);
              }
            });
          }
        }
      }
    )(req, res, next);
  });

  router.post("/register", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const nickname = req.body.nickname;
    const user = new User({
      email: email,
      password: password,
      name: name,
      address: address,
      nickname: nickname,
    });
    user
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.post("/logout", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal server error.");
        }
        res.status(200).send("Successfully logged out.");
      });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/getAllUsers", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.find().populate("clubs");
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/checkAuth", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  router.get("/getCurrentUser", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.findOne({ _id: req.user });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.delete("/deleteUser", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.query.userId;

      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const query = User.deleteOne({ _id: id });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.put("/changeUserData", (req: Request, res: Response) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const nickname = req.body.nickname;
    const address = req.body.address;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    User.updateOne(
      { _id: userId },
      { $set: { name: name, nickname: nickname, address: address } }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(updatedUser);
      })
      .catch((error) => {
        res
          .status(500)
          .send({ error: "Unable to update user", message: error.message });
      });
  });

  // Music management

  router.post("/saveBook", (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;
    const book = new Music({
      title: title,
      author: author,
    });
    book
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.get("/getAllBooks", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = Music.find().populate("clubs");
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.get("/getBook", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = Music.findOne({ _id: { $eq: req.query.bookId } });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  router.delete("/deleteBook", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const bookId = req.query.bookId;

      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }
      const query = Music.deleteOne({ _id: bookId });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  // Album management

  router.get("/getAllClubs", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = Album.find().populate("books").populate("users");
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Internal server error.");
        });
    } else {
      res.status(500).send("User is not logged in.");
    }
  });

  return router;
};