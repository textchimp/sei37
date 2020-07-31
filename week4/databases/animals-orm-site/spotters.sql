
DROP TABLE IF EXISTS spotters;

CREATE TABLE spotters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  animal_id INTEGER -- Foreign key: this is the primary key of the 'animals' table
                    -- This must be named with the singular of the other table name, and '_id'
);

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Mikaela', 'Sydney', 1 );  -- WARNING! hardcoding IDs will probably break eventually!

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Joel', 'Glasgow', 1 );  -- WARNING! hardcoding IDs will probably break eventually!

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Lay', 'Sydney', 3 );  -- WARNING! hardcoding IDs will probably break eventually!

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Zara', 'Berlin', 2 );  -- WARNING! hardcoding IDs will probably break eventually!
