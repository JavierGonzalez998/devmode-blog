import ModalAdd from "./components/hover/add/addbutton"
export default function CategoriesPage(){
    return(
        <div className="size-full pt-5">
        <h1 className="text-2xl font-semibold text-center">Categorías</h1>
        <div className="w-full flex flex-row justify-end items-center pr-5">
            <ModalAdd/>
        </div>        
        </div>
    )
}