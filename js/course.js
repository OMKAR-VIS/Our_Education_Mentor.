const courses = {

english: [
    {title:"English Chapter 1", link:"https://www.youtube.com/embed/VIDEO_ID1"},
    {title:"English Chapter 2", link:"https://www.youtube.com/embed/VIDEO_ID2"}
],

spoken: [
    {title:"Spoken Class 1", link:"https://www.youtube.com/embed/VIDEO_ID3"},
    {title:"Spoken Class 2", link:"https://www.youtube.com/embed/VIDEO_ID4"}
],

science: [
    {title:"Science Chapter 1", link:"https://www.youtube.com/embed/VIDEO_ID5"}
],

math: [
    {title:"Math Chapter 1", link:"https://www.youtube.com/embed/VIDEO_ID6"}
],

hindi: [
    {title:"Hindi Chapter 1", link:"https://www.youtube.com/embed/VIDEO_ID7"}
],

social: [
    {title:"Social Science 1", link:"https://www.youtube.com/embed/VIDEO_ID8"}
]

};

function loadCourse(course){
    const list = document.getElementById("videoList");
    const frame = document.getElementById("videoFrame");

    list.innerHTML = "";

    courses[course].forEach(video => {

        const div = document.createElement("div");
        div.innerText = video.title;

        div.onclick = () => {
            frame.src = video.link;
        };

        list.appendChild(div);
    });

    frame.src = courses[course][0].link;
}