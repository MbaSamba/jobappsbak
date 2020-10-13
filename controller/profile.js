const Profile = require("../model/profile");

exports.createProfile = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const profile = new Profile({
    fullName: req.body.fullName,
    profession: req.body.profession,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    town: req.body.town,
    filePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  profile
    .save()
    .then((createProfile) => {
      console.log(createProfile);
      res.status(201).json({
        message: "Profile add",
        profile: {
          ...createProfile,
          id: createProfile._id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Failed to create Profile",
      });
    });
};

exports.getAllProfiles = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const ProfileQuery = Profile.find();
  let fechedProfiles;
  if (pageSize && currentPage) {
    ProfileQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  ProfileQuery.then((documents) => {
    fechedProfiles = documents;
    return Profile.countDocuments();
  })
    .then((count) => {
      res.status(200).json({
        message: "The Profiles are fetched successfuly",
        profiles: fechedProfiles,
        maxProfiles: count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Failed to fetch profiles",
      });
    });
};

exports.getSingleProfile = (req, res, next) => {
  Profile.findById(req.params.id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: "Not found in here" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Failed to fetch profile",
      });
    });
};
