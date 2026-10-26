const Register = require("../model/registor");
const catchAsyncErrors = require("../middleware/catchAsynErrors");

exports.registerDetails = catchAsyncErrors(async (req, res, next) => {
    const { name, number, email, password, confirmpassword, role } = req.body;

    // 1. Validation: Required fields
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({
            success: false,
            error: "Please provide all required fields: name, email, password, and confirm password."
        });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = String(email).toLowerCase().trim();
    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
            success: false,
            error: "Please provide a valid email address."
        });
    }

    // 3. Password match validation
    if (password !== confirmpassword) {
        return res.status(400).json({
            success: false,
            error: "Passwords do not match."
        });
    }

    // 4. Password length check
    if (String(password).length < 6) {
        return res.status(400).json({
            success: false,
            error: "Password must be at least 6 characters long."
        });
    }

    // 5. Duplicate check
    const existingUser = await Register.findOne({ email: normalizedEmail });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            error: "User or Email already exists. Please sign in instead."
        });
    }

    // 6. Role formatting
    const assignedRole = role
        ? (Array.isArray(role) ? role : [String(role).toUpperCase()])
        : ["USER"];

    // 7. Create user in database
    const register = await Register.create({
        name: String(name).trim(),
        number: number ? Number(number) : 0,
        email: normalizedEmail,
        password,
        confirmpassword,
        role: assignedRole,
        paidAt: Date.now(),
    });

    // 8. Generate auth token
    let token = null;
    try {
        token = await register.generateAuthToken();
    } catch (tokenErr) {
        console.warn("Token generation warning on register:", tokenErr.message);
    }

    // 9. Return sanitized user and token with HTTP 201 Created
    const sanitizedUser = {
        _id: register._id,
        name: register.name,
        email: register.email,
        number: register.number,
        role: register.role,
        createdAt: register.paidAt
    };

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: sanitizedUser,
        token
    });
});