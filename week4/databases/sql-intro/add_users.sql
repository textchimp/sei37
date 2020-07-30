
-- To add rows to a table, we use the 'INSERT INTO' SQL command

INSERT INTO users ( id, email, name, password, profile_image, verified, age )
  VALUES(
    1,
    'luke@ga.co',
    'Luke',
    'chicken',
    'http://www.fillmurray.com/200/300',
    1, -- 1 means true
    12
  );

INSERT INTO users ( id, email, name, password, profile_image, verified, age )
  VALUES(
    2,
    'zara@ga.co',
    'Zara',
    'chicken',
    'http://www.fillmurray.com/500/300',
    1, -- 1 means true
    13
  );

INSERT INTO users ( id, email, name, password, profile_image, verified, age )
  VALUES(
    3,
    'lay@ga.co',
    'Lay',
    'chicken',
    'http://www.fillmurray.com/500/600',
    0, -- 1 means true
    13
  );
