const fs = require("fs");


const todos = fs.readFileSync("./database.json");

parsedTodos = JSON.parse(todos);

const [,,newtodo] = process.argv;


switch (newtodo) {
  case "get":
    parsedTodos.length == 0 ?  console.log("No Current Todos") : console.log(parsedTodos);
    break;

    case "add":
      let counter = 0;
      let inputTask = process.argv[3];
      if(parsedTodos.length > 0){
          counter = parsedTodos[parsedTodos.length-1].id;
      }
      counter++;
      parsedTodos.push({"id":counter , "task":inputTask});
      fs.writeFileSync("./database.json" ,JSON.stringify(parsedTodos));
      break;


      case "delete":
        const nid = +process.argv[3]
        let newtodos = parsedTodos.filter(tdo => tdo.id !==nid);
        fs.writeFileSync("./database.json" ,JSON.stringify(newtodos));
        break;

        case "edit":
        const nelaid = +process.argv[3]
        const ntext = process.argv[4]
        if (ntext.length !== 0){
          const todo = parsedTodos.find((a)=> a.id == nelaid)
          todo.task = ntext ; 
          fs.writeFileSync("./database.json" ,JSON.stringify(parsedTodos));
        }else {
          console.log("you should enter value")
      }
        break;

  default:
    console.log("you Must choose one of   get | add | delete | edit ")
    break;
}





