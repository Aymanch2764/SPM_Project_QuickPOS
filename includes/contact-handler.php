<?php
// ==========================================
// CONTACT FORM HANDLER - PHP BACKEND
// ==========================================

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Sanitize inputs
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    
    // Initialize error array
    $errors = array();
    
    // ==========================================
    // VALIDATION
    // ==========================================
    
    // Validate Name
    if (empty($name)) {
        $errors[] = "Name is required";
    } elseif (strlen($name) < 2) {
        $errors[] = "Name must be at least 2 characters";
    } elseif (strlen($name) > 100) {
        $errors[] = "Name is too long";
    }
    
    // Validate Email
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    // Validate Message
    if (empty($message)) {
        $errors[] = "Message is required";
    } elseif (strlen($message) < 10) {
        $errors[] = "Message must be at least 10 characters";
    } elseif (strlen($message) > 1000) {
        $errors[] = "Message is too long (max 1000 characters)";
    }
    
    // ==========================================
    // PROCESS FORM
    // ==========================================
    
    if (empty($errors)) {
        // No errors - SUCCESS!
        
        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Log the submission
        
        // For this project, we'll simulate success by logging to a file
        
        // Create log entry
        $log_entry = "=================================\n";
        $log_entry .= "Date/Time: " . date('Y-m-d H:i:s') . "\n";
        $log_entry .= "Name: " . $name . "\n";
        $log_entry .= "Email: " . $email . "\n";
        $log_entry .= "Message: " . $message . "\n";
        $log_entry .= "=================================\n\n";
        
        // Save to log file (create if doesn't exist)
        file_put_contents('contact-log.txt', $log_entry, FILE_APPEND);
        
        // Redirect to thank you page with name parameter
        header("Location: ../thankyou.html?name=" . urlencode($name));
        exit();
        
    } else {
        // Errors found - redirect back with error message
        $error_message = implode(", ", $errors);
        
        // Store error in session would be better, but for simplicity we'll use URL parameter
        header("Location: ../index.php#contact?error=" . urlencode($error_message));
        exit();
    }
    
} else {
    // Not a POST request - redirect to home
    header("Location: ../index.php");
    exit();
}
?>