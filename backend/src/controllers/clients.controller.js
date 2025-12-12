import pool from "../config/db.js";

export const getClientes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

export const createCliente = async (req, res) => {
  const {
    email,
    full_name,
    age,
    vehicle_model,
    color_vehicle,
    vehicle_year,
    licencia,
    ssn,
    address_residential,
    city,
    state,
    postal_code,
    phone_number,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO clients 
      (email, full_name, age, vehicle_model, color_vehicle, vehicle_year, licencia, ssn, address_residential, city, state, postal_code, phone_number)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *`,
      [
        email,
        full_name,
        age,
        vehicle_model,
        color_vehicle,
        vehicle_year,
        licencia || null,
        ssn || null,
        address_residential,
        city,
        state,
        postal_code,
        phone_number,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};

