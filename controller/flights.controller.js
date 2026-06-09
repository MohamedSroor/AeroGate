const mongoose = require("mongoose");
const Flight = require("../models/flight.model");
const express = require("express");

// Get all flights
const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();

        if (flights.length === 0) {
            return res.status(404).json({ message: "No flights found" });
        } else {
            res.status(200).json(flights);
        }

    } catch (error) {
        res.status(500).json({
            message: "Error while getting flights",
            details: error.message
        });
    }
}

// Add a flight
const addFlight = async (req, res) => {
    try {
        const { flightNumber, destination, departureTime } = req.body;

        if (!flightNumber || !destination || !departureTime) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const flight = await Flight.create({
            flightNumber,
            destination,
            departureTime
        })

        res.status(201).json({ message: "Flight added successfully", flight: flight });

    } catch (error) {
        res.status(500).json({
            message: "Error while adding flight",
            details: error.message
        });
    }
}

const updateFlight = async (req, res) => {
    try {
        const { flightNumber, destination, departureTime } = req.body;
        const flightId = req.params.id;
        const flightExist = await Flight.findById(flightId);

        if (!flightExist) {
            return res.status(400).json({ message: "Flight does not exist" });
        }

        const updatedFlight = await Flight.findByIdAndUpdate(flightId, { flightNumber, destination, departureTime }, { new: true });

        res.status(200).json({ message: "Flight updated successfully", flight: updatedFlight });


    } catch (error) {
        res.status(500).json({
            message: "Error while updating flight",
            details: error.message
        });
    }
}

const deleteFlight = async (req, res) => {
    try {
        const flightId = req.params.id;
        const deletedFlight = await Flight.findByIdAndDelete(flightId);

        if (!deletedFlight) {
            return res.status(400).json({ message: "Flight does not exist" });
        }

        res.status(200).json({ message: "Flight deleted successfully", flight: deletedFlight });

    } catch (error) {
        res.status(500).json({
            message: "Error while deleting flight",
            details: error.message
        });
    }
}

module.exports = {
    getFlights,
    addFlight,
    updateFlight,
    deleteFlight
}