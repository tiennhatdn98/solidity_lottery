// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Minigame {
    struct Student {
        string _id;
        address account;
    }

    Student[] public students;
    // mapping(address => Student) public students;

    // constructor(string memory _name, uint _age) {
    //     student.name = _name;
    //     student.age = _age;
    // }

    event SC_SignUp(string id, address _account);

    function signUp(string memory id) public {
        // students[msg.sender] = Student(id);
        Student memory student = Student(id, msg.sender);
        students.push(student);
        emit SC_SignUp(id, msg.sender);
    }
}