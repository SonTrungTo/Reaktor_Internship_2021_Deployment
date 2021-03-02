const express = require("express");
const cors = require("cors");
const proxy = require("http-proxy-middleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/",)

const unknownEndPoint = (_, res) => {
    return res.status(404).json({
        error: "Unknown endpoint"
    });
};

const errorHandler = (err, _req, res, next) => {
    console.error(err.name, err.message);

    for (const errName of err.errors) {
        if (err.errors[errName].message) {
            let message = err.errors[errName].message;
            return res.status(400).json({
                error: message
            });
        }
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            error: err.message
        });
    }

    next(err);
};

app.use(unknownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});