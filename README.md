# JS-calculator

## Task
[Task Link](https://drive.google.com/file/d/1OiCm2BhMHlP9plk9WFGvFYU2XwPuR9ar/view?usp=sharing)

## Deploy
[Deploy Link](https://kristykov.github.io/JS-calculator/dist/)

## How to run the app

First, clone repo:

```
git clone https://github.com/kristykov/JS-calculator
```

Go to the folder, install dependencies and run the development server:

```
$ npm install

$ npm run start
```
Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## Features
The Calculator can be used to perform the operations of addition, subtraction, multiplication, and division. You 
can also use Calculator for squaring, cubing, square rooting, cube rooting. Calculator can be used to determine values 
of the exponential functions, the x root function, multiplicative inverse (reciprocal function), and the factorial function. 

With Calculator you can store numbers 
to use them later. It also has the ability to recognize both positive and negative numbers. However, it does not
recognize or apply the order of operations. For example, entering 2 + 3 × 5 would result with the
calculator reading “25”. The calculator does each operation in the order it is entered, as opposed to
following the order of operations with multiplication done before addition. 

## Directory layout
                               
    ├── coverage                # Jest coverage files
    ├── dist                    # Compiled files   
    ├── src                     # Source files 
    │   ├── assets              # Asset files
    │   ├── commands            # Modules for math commands
    │   ├── tests               # Unit tests for each math command
    │   ├── index.html          
    │   ├── index.js
    └── └── style.scss 



