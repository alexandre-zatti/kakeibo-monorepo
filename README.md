![Tests](https://github.com/alexandre-zatti/groceries-monorepo/actions/workflows/test.yaml/badge.svg)

# 🏦 Kakeibo

A modern financial management system built as a TypeScript monorepo using
Turborepo. Kakeibo (家計簿) is a Japanese budgeting method that helps you
understand your relationship with money and improve your spending habits.

## 📋 Overview

This project is currently under construction and implements various
microservices to manage different aspects of personal finance tracking and
management.

## 🏗️ Project Structure

- **kakeibo/**
    - **ui/** — Frontend application built with Next.js
    - **groceries-api/** — Backend API for groceries management
    - **packages/** — Shared packages and utilities

## 🔧 Services

### UI Service

- **Tech Stack**: Next.js 15, React 19, TailwindCSS
- **Description**: Modern web interface for interacting with the financial
  management system
- **Features**:
    - Responsive design using TailwindCSS
    - Component library built with Radix UI
    - Type-safe development with TypeScript

### Groceries API

- **Tech Stack**: NestJS 11, TypeORM, SQLite
- **Description**: Backend service managing grocery-related expenses and
  tracking
- **Features**:
    - REST API with Swagger documentation
    - Database integration with TypeORM
    - Containerized with Docker
    - **Azure AI Integration**: Automatically extracts purchase data from
      receipt images using Azure's Document Intelligence (formerly Form
      Recognizer), and populates the grocery purchase database with structured
      information

## 🏗️ Project Status

This project is currently under active development. Features and documentation
will be updated regularly.
