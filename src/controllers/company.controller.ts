import { Request, Response } from 'express';

import {
    getCompanies, 
    createCompany,
    generateCompanyId, 
    editCompany, 
    removeCompany,
} from '../repository';


export const get = (req: Request, res: Response) => {
     let companies = getCompanies();
    res.status(200).json(companies);
};

 export const create = (req: Request, res: Response) => {
    const company = {
        id: generateCompanyId(),
        organization: req.body.organization,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: req.body.products,
        marketValue: req.body.marketValue,
        address: req.body.address,
        ceo: req.body.ceo,
        country: req.body.country,
        noOfEmployees: req.body.noOfEmployees,
        employees: req.body.employees
    };
    createCompany(company);
    res.status(201).json(company);
};

export const edit = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const {
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
    } = req.body;

    const data = {
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
    };

    const editedCompany = editCompany(id, data);
    if (editedCompany) {
        res.status(200).json(editedCompany);
    } else {
        res.status(404).json({ message: 'Company not found' });
    }
};

export const remove = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const isDeleted = removeCompany(id);
    if (isDeleted) {
        res.status(200).json({ message: 'Company successfully deleted' });
    } else {
        res.status(404).json({ message: 'Company with the given ID was not found' })
    }
};
