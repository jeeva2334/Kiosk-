const Menu = require('../Model/menu');

async function addMenu(req,res){
    const {name, price, quantity, description, image} = req.body;
    const menu = new Menu({
        name,
        price,
        quantity,
        description,
        image
    });
    await menu.save();
    res.json({status: 'Menu Saved'});   
}

async function getMenu(req,res){
    const menu = await Menu.find();
    res.json(menu);
}

async function deleteMenu(req,res){
    await Menu.findByIdAndRemove(req.params.id);
    res.json({status: 'Menu Deleted'});
}

async function updateMenu(req,res){
    const {name, price, quantity, description, image} = req.body;
    const {id} = req.params;
    const newMenu = {name, price, quantity, description, image};
    await Menu.findByIdAndUpdate(id, newMenu);
    res.json({status: 'Menu Updated'});
}

async function getSingleMenu(req,res){
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
}

module.exports = {
    addMenu,
    getMenu,
    deleteMenu,
    updateMenu,
    getSingleMenu
}