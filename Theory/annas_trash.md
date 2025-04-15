const a = 10, b = 8;
const min = a < b ? a: b;
console.log(min)

The same as:

const a = 10, b = 8;
const min = [a,b][+(a < b)] // min is array and [+(a < b)] - index of the array. (a < b) - will return TRUE or FALSE, but  '+' changes it to integer. 
    // So if a < b => index [+(a < b)] will be 0 and min will be a
console.log(min)



Videos to watch: 
https://www.youtube.com/watch?v=xo7XrRVxH8Y

https://www.youtube.com/watch?v=q-_ezD9Swz4

https://www.youtube.com/watch?v=EM8IgIIiOdY


Tutorials:
https://github.com/practical-tutorials/project-based-learning
https://github.com/microsoft/Web-Dev-For-Beginners
https://github.com/EbookFoundation/free-programming-books
https://github.com/ashishps1/awesome-leetcode-resources




VS code extensions: 
CodeTour
Draw.io

Roadmaps!!!
https://roadmap.sh/


Html+css+JS
https://codepen.io/alpoo/pen/XWbKOzx