db.createUser(
    {
        user: "demo",
        pwd: "demo",
        roles:[
            {
                role: "dbOwner",
                db:   "demo"
            }
        ]
    }
);
