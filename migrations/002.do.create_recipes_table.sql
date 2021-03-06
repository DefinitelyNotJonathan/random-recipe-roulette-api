CREATE TABLE random_recipes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    source TEXT,
    preptime INTEGER NOT NULL,
    waittime INTEGER NOT NULL,
    cooktime INTEGER NOT NULL,
    servings INTEGER,
    comments TEXT,
    calories INTEGER,
    fat INTEGER,
    satfat INTEGER,
    carbs INTEGER,
    fiber INTEGER,
    sugar INTEGER,
    protein INTEGER,
    instructions TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    tags TEXT,
    author_id INTEGER REFERENCES random_recipe_users(id) ON DELETE CASCADE,
    firstname TEXT,
    lastname TEXT
);