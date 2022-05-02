const { getPool } = require("../data/getPool");
const url = require("url");

async function postEntry(req, res) {
  const { title, description, url } = req.body;
  const href = url.parse(description);
  const pool = getPool();
  const [insertPost] = await pool.query(
    "INSERT INTO posts (title, post_description, post_url) Values(?, ?, ?)",
    [title, description, href]
  );
  res.send({
    id: insertPost.insertid,
    title,
    description,
    url,
  });
}
module.exports = { postEntry };
