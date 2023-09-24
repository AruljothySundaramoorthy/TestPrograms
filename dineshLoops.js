const data = [
  {
    id: 1,
    first_name: "Ralf",
    last_name: "Coppins",
    email: "rcoppins0@aboutads.info",
    gender: "Male",
    ip_address: "149.104.252.199",
  },
  {
    id: 2,
    first_name: "Clement",
    last_name: "Figin",
    email: "cfigin1@go.com",
    gender: "Male",
    ip_address: "165.202.55.214",
  },
  {
    id: 3,
    first_name: "Gallard",
    last_name: "Hattoe",
    email: "ghattoe2@blogger.com",
    gender: "Male",
    ip_address: "103.32.212.98",
  },
  {
    id: 4,
    first_name: "Lilias",
    last_name: "Bearns",
    email: "lbearns3@jigsy.com",
    gender: "Female",
    ip_address: "18.197.91.125",
  },
  {
    id: 5,
    first_name: "Karlens",
    last_name: "Blissett",
    email: "kblissett4@sakura.ne.jp",
    gender: "Male",
    ip_address: "236.5.253.58",
  },
  {
    id: 6,
    first_name: "Yule",
    last_name: "Laslett",
    email: "ylaslett5@mapy.cz",
    gender: "Male",
    ip_address: "189.34.110.125",
  },
  {
    id: 7,
    first_name: "Shantee",
    last_name: "Bowerman",
    email: "sbowerman6@hostgator.com",
    gender: "Genderqueer",
    ip_address: "149.8.38.102",
  },
  {
    id: 8,
    first_name: "Deloria",
    last_name: "Lockhurst",
    email: "dlockhurst7@bing.com",
    gender: "Female",
    ip_address: "113.119.124.85",
  },
  {
    id: 9,
    first_name: "Rooney",
    last_name: "Devote",
    email: "rdevote8@who.int",
    gender: "Male",
    ip_address: "194.4.239.166",
  },
  {
    id: 10,
    first_name: "Catina",
    last_name: "Worsam",
    email: "cworsam9@vkontakte.ru",
    gender: "Female",
    ip_address: "35.25.90.224",
  },
];

/**
 * map = > data transform
 * filter => based oj condition you can fuilter the data
 * find => find based on user email
 * forEach => native for loop
 * reduce => for accumulation and calculation
 */

// const emailData = data.map((single) => single.email);

// console.log(emailData);

const genderFilerData = data
  .filter((singleGenderData) => singleGenderData.gender == "Female")
  .map((filtereddata) => filtereddata.email);
console.log(genderFilerData);

// const findUserBasedonEmail = data.find(
//   (userdata) => userdata.email == "rdevote8@who.int"
// );
// console.log(findUserBasedonEmail);
