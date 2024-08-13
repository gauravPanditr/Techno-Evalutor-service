import PythonExecutor from "../container/runPythonDocker";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";


export default function createExceutor(codeLanguage:string):CodeExecutorStrategy | null{
if(codeLanguage==="PYTHON")
     return new PythonExecutor();
    else
    return null;
}

