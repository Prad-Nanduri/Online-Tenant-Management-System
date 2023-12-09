import express from 'express';
import { Tenant } from '../models/tenantModel.js';


const router = express.Router();

//Route to add a new tenant
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.phonenumber ||
            !request.body.email ||
            !request.body.dateofCin ||
            !request.body.dateofCout ||
            !request.body.aptNum
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, phonenumber, email, dateofCin, dateofCout, aptNum',
            });
        }
        const newTenant = {
            name: request.body.name,
            phonenumber: request.body.phonenumber,
            email: request.body.email,
            dateofCin: request.body.dateofCin,
            dateofCout: request.body.dateofCout,
            aptNum: request.body.aptNum,
        };

        const tenant = await Tenant.create(newTenant);

        return response.status(201).send(tenant);

    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});


//Route to get all tenants from the database
router.get('/', async (request, response) => {
    try {
        const tenants = await Tenant.find({});

        return response.status(200).json({
            count: tenants.length,
            data: tenants
        });
    }catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to get one tenant from the database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        // Use mongoose.Types.ObjectId to convert the string to ObjectId
        const tenant = await Tenant.findById(id);

        if (!tenant) {
            return response.status(404).json({ message: 'Tenant not found' });
        }

        return response.status(200).json(tenant);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to Update/Move a tenant
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.phonenumber ||
            !request.body.email ||
            !request.body.dateofCin ||
            !request.body.dateofCout ||
            !request.body.aptNum
        ){
            return response.status(400).send({
                message: 'Send all required fields: name, phonenumber, email, dateofCin, dateofCout, aptNum',
            });
        }

        const { id } = request.params;

        const result = await Tenant.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Tenant not found' });
        }
        return response.status(200).send({ message: 'Tenant Updated Successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Delete a Tenant
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Tenant.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Tenant not found' });
        }

        return response.status(200).send({ message: 'Tenant Deleted Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;