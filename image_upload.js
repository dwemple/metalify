var guid = 0;
var path = "";
var currentLink = "";
async function showQRcode() {
  await saveFile();
  path = "/images/" + guid + ".png";
  await uploadFile();
  await getLink(path);
  showcaseQRcodeOnSide(currentLink);
}
async function saveFile() {
  guid = crypto.randomUUID().replaceAll("-", "");
  save(`${guid}.png`);
  return new Promise((resolve) => setTimeout(resolve, 500));
}
async function uploadFile() {
  var dbx = new Dropbox.Dropbox({
    accessToken: ACCESS_TOKEN,
  });
  const file = await (await fetch(path)).arrayBuffer();
  return await dbx
    .filesUpload({ path: path, contents: file })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error.error || error);
    });
}
async function getLink() {
  var postresponse;
  var query = {
    url: "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
    type: "POST",
    async: true,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: `{"path": "${path}","settings":{"access":"viewer","allow_download":true,"audience":"public","requested_visibility":"public"}}`,
  };
  try {
    postresponse = await $.ajax(query);
  } catch (e) {
    console.log(e);
  }
  postresponse = await $.ajax({
    url: "https://api.dropboxapi.com/2/sharing/list_shared_links",
    type: "POST",
    async: true,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: `{"path": "${path}"}`,
  });
  currentLink = await postresponse.links[0].url;
}
function showcaseQRcodeOnSide(link) {
  var qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`;
  var img = document.getElementById("qr-img");
  img.src = qrLink;
  img = document.getElementById("img-preview");
  img.src = path;
}
