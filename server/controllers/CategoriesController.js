import pool from '../model/dbConfig';

/**
 * @description Defines the actions to for the category endpoints
 * @class CategoriesController
 */

class CategoriesController {
  /**
    *Gets all Categories
    *@description Retrieves all the category from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing category
    *@memberof CategoriesController
    */

  static getAllCategories(req, res) {
    const query = {
      text: 'SELECT * FROM Categories',
    };
    pool.query(query).then((category) => {
      /* istanbul ignore next */if (category.rowCount > 0) {
        return res.status(200).json({
          CategoriesModel: category.rows,
          message: 'Success',
          error: false,
        });
      }
    }).catch(/* istanbul ignore next */ err => (
      res.status(500).json(err)
    ));
  }
  /**
  *Gets category
  *@description Retrieves a category by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the retrieved category detail
  *@memberof CategoriesController
  */

  static getCategory(req, res) {
    const { categoryId } = req.params;
    let categoryDetail;
    const query = {
      text: 'SELECT * FROM Categories Where id = $1',
      values: [categoryId],
    };
    pool.query(query).then((category) => {
      const { rowCount, rows } = category;
      if (rowCount > 0) {
        categoryDetail = rows[0];
        return (
          res.status(200).json({
            categoryDetail,
            message: 'Success',
            error: false,
          })
        );
      }
      return (
        res.status(404).json({
          message: 'No category found',
          error: true,
        })
      );
    }).catch(/* istanbul ignore next */err => (
      res.status(500).json({
        err,
      })
    ));
  }
  /**
  *Creats category
  *@description Creates a new category
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the new category detail
  *@memberof CategoriesController
  */

  static addCategory(req, res) {
    const { categoryName } = req.body;
    let categoryDetail;
    pool.query({
      text: 'SELECT * FROM Categories WHERE categoryName = $1',
      values: [categoryName.toLowerCase()],
    }).then((found) => {
      if (found.rowCount) {
        return res.status(409).json({ message: 'This category already exist' });
      }
      const query = {
        text: 'INSERT INTO Categories(categoryName) VALUES($1) RETURNING *',
        values: [categoryName.toLowerCase()],
      };
      pool.query(query).then((category) => {
        categoryDetail = category.rows[0];
        return res.status(201).json({ categoryDetail, message: 'Category created successfully' });
      }).catch(/* istanbul ignore next */ err => res.status(500).json(err));
    }).catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  /**
  *Update category
  *@description Updates a category
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, message and the updated category detail
  *@memberof CategoriesController
  */

  static updateCategory(req, res) {
    const { categoryName } = req.body;
    const { categoryId } = req.params;
    let categoryDetail;
    pool.query({ text: 'SELECT id from Categories where id = $1', values: [categoryId] })
      .then((found) => {
        if (found.rowCount === 1) {
          const query = {
            text: 'UPDATE Categories SET categoryName = $1 WHERE id = $2 RETURNING *',
            values: [categoryName, categoryId],
          };
          pool.query(query).then((category) => {
            categoryDetail = category.rows[0];
            return res.status(201).json({ categoryDetail, message: 'Category updated successfully' });
          });
        } else {
          return res.status(404).json({ message: 'Category does not exist', error: true });
        }
      }).catch(/* istanbul ignore next */err => (
        res.status(500).json(err)
      ));
  }

  /**
  *Deletes Category
  *@description Deletes a category by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code and message
  *@memberof CategoriesController
  */

  static deleteCategory(req, res) {
    const { categoryId } = req.params;
    const query = {
      text: 'DELETE FROM Categories Where id = $1',
      values: [categoryId],
    };
    pool.query(query).then((category) => {
      const { rowCount } = category;
      if (rowCount > 0) {
        return (
          res.status(200).json({
            message: 'Successfully deleted category',
            error: false,
          })
        );
      }
      return (
        res.status(404).json({
          message: 'Category does not exist',
          error: true,
        })
      );
    }).catch(/* istanbul ignore next */err => (res.status(500).json(err)));
  }
}

export default CategoriesController;
