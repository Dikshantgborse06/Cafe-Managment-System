import { Injectable } from "@angular/core";

export interface Menu{
    state: string;
    name: string;
    icon: string;
    type: string;
}

const MENUITEMS = [
    {state: 'dashboard', name: 'Dashboard', type:'link', icon: 'dashboard', role:''},  //both user and admin can login thats y role is empty
    // {state: 'category', name: 'Manage Category', type:'link', icon: 'category', role:'admin'},
    // {state: 'product', name: 'Manage Product', type:'link', icon: 'inventory_2', role:'admin'},
    // {state: 'order', name: 'Manage Order', type:'link', icon: 'list_alt', role:''},
    // {state: 'bill', name: 'View Bill', type:'link', icon: 'import_contacts', role:''},
    // {state: 'user', name: 'View User', type:'link', icon: 'people', role:'admin'}
];
@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}