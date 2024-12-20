import React, { createContext, useState, ReactNode } from "react";
import { DogData } from "../models/DogData";

const DogDataContext = createContext<DogData>(undefined);
