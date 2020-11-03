const express = require("express");

const db = require("./data/connect");

const router = express.Router();

const Cars = {
  getAll() {
    return db("cars");
  },
  getById(id) {
    return db("cars").where({ id });
  },
  create(account) {
    return db("cars").insert(account);
  },
  update(id, account) {
    return db("cars").where({ id }).update(account);
  },
  delete(id) {
    return db("cars").where({ id }).del();
  },
};

router.get("/", (req, res) => {
  Cars.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  Cars.getById(req.params.id)
    .then((data) => {
      if (!data.length) {
        res.json({ message: "no post with said id" });
      } else {
        res.json(data[0]);
      }
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.post("/", (req, res) => {
  Cars.create(req.body)
    .then(([id]) => {
      return Cars.getById(id).first();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

// router.put("/:id", async (req, res) => {
//   try {
//     const count = await Cars.update(req.params.id, req.body);
//     if (!count) {
//       res.json({ message: "no post with that id" });
//     } else {
//       const updatedPost = await Cars.getById(req.params.id).first();
//       res.json(updatedPost);
//     }
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

// router.put("/:id", (req, res) => {
//   Cars.update(req.params.id, req.body)
//     .then((count) => {
//       if (!count) {
//         res.json({ message: "no post with that id" });
//       } else {
//         return Cars.getById(req.params.id).first();
//       }
//     })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.json({ message: error.message });
//     });
// });

// router.delete("/:id", (req, res) => {
//   Cars.delete(req.params.id)
//     .then((deletedRowsNumber) => {
//       if (!deletedRowsNumber) {
//         res.json({ message: "no post with given id" });
//       } else {
//         res.json({ message: "post deleted successfully" });
//       }
//     })
//     .catch((error) => {
//       res.json({ message: error.message });
//     });
// });

module.exports = router;
