import {
  User,
  Course,
  Enrollment,
  Assignment,
  AssignmentSubmission,
  Quiz,
  QuizAttempt,
  DiscussionThread,
  Message,
  Notification,
  CalendarEvent,
  StudentNote,
  Bookmark,
  LearningGoal,
  Certificate,
  AuditLog,
  SystemSettings,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_student_1',
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Computer Science Undergraduate',
    institution: 'Pacific Institute of Technology',
    gradeLevel: 'Junior (3rd Year)',
    bio: 'Aspiring software engineer interested in distributed systems, machine learning, and interactive UI engineering.',
    joinedDate: '2025-09-01',
    status: 'active',
    interests: ['Algorithms', 'Web Development', 'Artificial Intelligence', 'Physics'],
    streakDays: 14,
    lastActive: '2026-08-18T11:45:00Z',
  },
  {
    id: 'usr_student_2',
    name: 'Maya Patel',
    email: 'maya.patel@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    title: 'Biochemistry & Pre-Med Student',
    institution: 'National Science Academy',
    gradeLevel: 'Senior (4th Year)',
    bio: 'Dedicated to cellular genetics and computational biology research.',
    joinedDate: '2025-08-15',
    status: 'active',
    interests: ['Molecular Biology', 'Genetics', 'Organic Chemistry'],
    streakDays: 8,
    lastActive: '2026-08-17T18:20:00Z',
  },
  {
    id: 'usr_student_3',
    name: 'Liam Smith',
    email: 'liam.smith@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Applied Mathematics & Physics',
    institution: 'Pacific Institute of Technology',
    gradeLevel: 'Sophomore (2nd Year)',
    bio: 'Passionate about quantum computing and mathematical modeling.',
    joinedDate: '2025-10-01',
    status: 'active',
    interests: ['Calculus', 'Linear Algebra', 'Classical Mechanics'],
    streakDays: 5,
    lastActive: '2026-08-18T09:30:00Z',
  },
  {
    id: 'usr_student_4',
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Data Science & Statistics',
    institution: 'National Science Academy',
    gradeLevel: 'Freshman (1st Year)',
    bio: 'Learning modern data analytics, visualization, and cloud engineering.',
    joinedDate: '2026-01-10',
    status: 'active',
    interests: ['Data Science', 'Python', 'Machine Learning'],
    streakDays: 12,
    lastActive: '2026-08-18T10:15:00Z',
  },
  {
    id: 'usr_student_5',
    name: 'Jordan Taylor',
    email: 'jordan.taylor@university.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'English Literature & Digital Humanities',
    institution: 'Pacific Institute of Technology',
    gradeLevel: 'Junior (3rd Year)',
    bio: 'Exploring computational linguistics and 20th century world literature.',
    joinedDate: '2025-09-12',
    status: 'active',
    interests: ['Literature', 'Creative Writing', 'Linguistics'],
    streakDays: 3,
    lastActive: '2026-08-16T14:00:00Z',
  },
  {
    id: 'usr_teacher_1',
    name: 'Dr. Eleanor Vance',
    email: 'eleanor.vance@university.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Associate Professor of Computer Science',
    institution: 'Pacific Institute of Technology',
    bio: 'Ph.D. in Computer Science from Stanford. 12+ years teaching Data Structures, Algorithms, and Modern Full-Stack Systems.',
    joinedDate: '2024-01-15',
    status: 'active',
    interests: ['Algorithms', 'Full Stack Architecture', 'AI Ethics'],
    lastActive: '2026-08-18T11:50:00Z',
  },
  {
    id: 'usr_teacher_2',
    name: 'Prof. Marcus Brody',
    email: 'marcus.brody@university.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Professor of Physics & Applied Mathematics',
    institution: 'Pacific Institute of Technology',
    bio: 'Theoretical physicist and educator. Passionate about bringing calculus and electromagnetism to life through simulation.',
    joinedDate: '2023-08-20',
    status: 'active',
    interests: ['Electromagnetism', 'Quantum Mechanics', 'Linear Algebra'],
    lastActive: '2026-08-18T08:20:00Z',
  },
  {
    id: 'usr_teacher_3',
    name: 'Ms. Sarah Jenkins',
    email: 'sarah.jenkins@university.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Lecturer in Biological Sciences',
    institution: 'National Science Academy',
    bio: 'Lead instructor for Molecular Biology, Genetics, and Bio-ethics with an emphasis on laboratory techniques.',
    joinedDate: '2024-03-01',
    status: 'active',
    interests: ['Genetics', 'CRISPR', 'Cell Biology'],
    lastActive: '2026-08-17T16:45:00Z',
  },
  {
    id: 'usr_admin_1',
    name: 'Dr. Robert Sterling',
    email: 'admin.sterling@university.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    title: 'Dean of Academic Technology & Platform Director',
    institution: 'EduPulse Global Learning Network',
    bio: 'System Administrator and Academic Technology Lead overseeing institutional governance, security, and curriculum compliance.',
    joinedDate: '2023-01-01',
    status: 'active',
    interests: ['EdTech', 'Institutional Governance', 'Analytics'],
    lastActive: '2026-08-18T12:00:00Z',
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_cs101',
    title: 'Data Structures & Algorithmic Thinking',
    subtitle: 'Master fundamental data structures, asymptotic notation, graphs, trees, and dynamic programming.',
    description: 'An intensive, hands-on computer science course exploring essential data structures (Arrays, Linked Lists, Hash Tables, Binary Search Trees, Heaps, and Graphs) alongside algorithmic paradigms (Divide-and-Conquer, Greedy, Dynamic Programming, and Graph Traversals). Designed with practical programming tasks, interactive memory diagrams, and performance benchmarks.',
    subject: 'Computer Science',
    difficulty: 'Intermediate',
    instructorId: 'usr_teacher_1',
    instructorName: 'Dr. Eleanor Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Associate Professor of Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 42,
    rating: 4.9,
    reviewCount: 328,
    enrolledCount: 1420,
    status: 'published',
    featured: true,
    learningObjectives: [
      'Analyze runtime and space complexity using asymptotic Big-O notation',
      'Implement singly and doubly linked lists, stacks, queues, and priority heaps',
      'Design balanced search trees (AVL, Red-Black) and implement tree traversal algorithms',
      'Construct graph representation models and master BFS, DFS, Dijkstra, and topological sort',
      'Apply dynamic programming memoization and tabulation to optimize combinatorial problems'
    ],
    requirements: [
      'Proficiency in at least one programming language (TypeScript/JavaScript, Python, Java, or C++)',
      'Basic knowledge of loops, recursion, and object-oriented concepts'
    ],
    modules: [
      {
        id: 'mod_cs101_1',
        courseId: 'crs_cs101',
        title: 'Module 1: Foundations of Complexity & Linear Structures',
        description: 'Understand time and space complexity, memory layouts, dynamic arrays, and linked lists.',
        order: 1,
        lessons: [
          {
            id: 'les_cs101_101',
            moduleId: 'mod_cs101_1',
            courseId: 'crs_cs101',
            title: '1.1 Asymptotic Analysis & Big-O Notation',
            description: 'Learn how to formally quantify algorithmic efficiency and compare worst, best, and average cases.',
            type: 'video',
            durationMinutes: 24,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c0133a0?w=600&auto=format&fit=crop&q=80',
            textContent: `### Asymptotic Complexity Overview
Algorithms are measured by how their execution time and memory footprint scale relative to input size $N$.

Key Complexity Classes:
* **$O(1)$ Constant Time:** Operations like hash map lookup or array index access.
* **$O(\\log N)$ Logarithmic Time:** Binary search and balanced tree lookups.
* **$O(N)$ Linear Time:** Single-pass array traversals and linear search.
* **$O(N \\log N)$ Linearithmic Time:** Optimal comparison-based sorting (Merge Sort, Heap Sort).
* **$O(N^2)$ Quadratic Time:** Nested loops, Bubble sort, Insertion sort.
* **$O(2^N)$ Exponential Time:** Naive recursive solutions for Fibonacci or Traveling Salesperson.`,
            codeSnippet: {
              language: 'typescript',
              code: `// Example: Demonstrating O(log N) Binary Search
function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1; // Not found
}`
            },
            resources: [
              { id: 'res_1', title: 'Big-O Cheat Sheet (PDF)', type: 'pdf', url: '#', size: '1.2 MB' },
              { id: 'res_2', title: 'Complexity Benchmarks (Code)', type: 'code', url: '#', size: '24 KB' }
            ],
            knowledgeCheck: [
              {
                id: 'kc_1',
                question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
                correctIndex: 1,
                explanation: 'A balanced BST divides search space in half at each step, yielding O(log N) lookup time.'
              }
            ]
          },
          {
            id: 'les_cs101_102',
            moduleId: 'mod_cs101_1',
            courseId: 'crs_cs101',
            title: '1.2 Dynamic Arrays vs. Linked Lists in Memory',
            description: 'Deep dive into contiguous memory allocations, cache locality, pointer traversal, and amortized insertion cost.',
            type: 'article',
            durationMinutes: 18,
            order: 2,
            textContent: `### Memory Architecture & Pointer Indirection
Dynamic arrays provide $O(1)$ random access because items reside in contiguous memory addresses. However, when capacity is exhausted, array resizing requires allocating a new memory block and copying all elements ($O(N)$ worst case, but $O(1)$ amortized).

In contrast, Linked Lists store discrete nodes scattered across the heap connected via pointer references. This makes node insertion at known positions $O(1)$, but removes $O(1)$ random access and suffers from poor CPU cache locality.`,
            codeSnippet: {
              language: 'typescript',
              code: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class SinglyLinkedList<T> {
  head: ListNode<T> | null = null;
  size: number = 0;

  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
}`
            },
            resources: [
              { id: 'res_3', title: 'Pointer Layout Diagrams', type: 'slides', url: '#', size: '3.4 MB' }
            ]
          }
        ]
      },
      {
        id: 'mod_cs101_2',
        courseId: 'crs_cs101',
        title: 'Module 2: Trees, Graphs & Priority Queues',
        description: 'Explore hierarchical structures, binary search trees, graph algorithms, and Dijkstra shortest path.',
        order: 2,
        lessons: [
          {
            id: 'les_cs101_201',
            moduleId: 'mod_cs101_2',
            courseId: 'crs_cs101',
            title: '2.1 Binary Search Trees & Self-Balancing Mechanisms',
            description: 'Understand node invariants, in-order tree traversal, and rotations in AVL and Red-Black trees.',
            type: 'video',
            durationMinutes: 30,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
            textContent: `### Binary Search Tree (BST) Properties
For every node with key $K$:
* All keys in its left subtree are $< K$.
* All keys in its right subtree are $> K$.

When a tree becomes degenerate (e.g. inserting sorted numbers), search degenerates to $O(N)$. Self-balancing trees execute left and right rotations to guarantee height $h \\le 1.44 \\log_2 N$.`,
            knowledgeCheck: [
              {
                id: 'kc_2',
                question: 'Which tree traversal yields keys in strictly ascending sorted order for a BST?',
                options: ['Pre-order traversal', 'In-order traversal', 'Post-order traversal', 'Level-order traversal'],
                correctIndex: 1,
                explanation: 'In-order traversal (Left -> Node -> Right) visits elements in ascending monotonic order.'
              }
            ]
          },
          {
            id: 'les_cs101_202',
            moduleId: 'mod_cs101_2',
            courseId: 'crs_cs101',
            title: '2.2 Graph Traversals: BFS, DFS & Shortest Path',
            description: 'Representing graphs as adjacency matrices vs lists, topological sorting, and weighted shortest path exploration.',
            type: 'interactive',
            durationMinutes: 35,
            order: 2,
            textContent: `### Graph Representations
Graphs $G = (V, E)$ are modeled in memory using:
1. **Adjacency Matrix:** $O(V^2)$ space, $O(1)$ edge query.
2. **Adjacency List:** $O(V + E)$ space, ideal for sparse graphs.

Breadth-First Search (BFS) uses a FIFO queue to discover shortest paths in unweighted graphs. Depth-First Search (DFS) explores paths deeply using recursion or a LIFO stack.`,
            codeSnippet: {
              language: 'typescript',
              code: `function bfs(graph: Map<string, string[]>, startNode: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [startNode];
  const order: string[] = [];

  visited.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);

    for (const neighbor of graph.get(current) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`
            }
          }
        ]
      }
    ],
    createdAt: '2025-08-01',
    updatedAt: '2026-08-10'
  },
  {
    id: 'crs_web201',
    title: 'Modern Full-Stack Web Engineering',
    subtitle: 'Architect production-grade web applications with React, Node.js, TypeScript, REST & Tailwind CSS.',
    description: 'Learn modern software architecture from frontend UI design systems to robust backend APIs. Covers React component state lifecycle, performance optimization, responsive layouts, authentication, RESTful APIs, and database modeling.',
    subject: 'Computer Science',
    difficulty: 'Intermediate',
    instructorId: 'usr_teacher_1',
    instructorName: 'Dr. Eleanor Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Associate Professor of Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 36,
    rating: 4.8,
    reviewCount: 215,
    enrolledCount: 980,
    status: 'published',
    featured: true,
    learningObjectives: [
      'Build performant, accessible component hierarchies in React 18+ with TypeScript',
      'Master Tailwind CSS styling, responsive grid layouts, and custom design tokens',
      'Design RESTful web services with Express, JWT authentication, and role authorization',
      'Implement robust client-side state management, query caching, and optimistic UI updates'
    ],
    requirements: [
      'Basic understanding of HTML, CSS, and modern JavaScript (ES6+)'
    ],
    modules: [
      {
        id: 'mod_web201_1',
        courseId: 'crs_web201',
        title: 'Module 1: Component Architecture & State Paradigms',
        description: 'React fundamentals, hooks, custom hooks, and memoization techniques.',
        order: 1,
        lessons: [
          {
            id: 'les_web201_101',
            moduleId: 'mod_web201_1',
            courseId: 'crs_web201',
            title: '1.1 React 18 Concurrent Rendering & State Batching',
            description: 'Understand virtual DOM diffing, automatic batching, and custom hooks composition.',
            type: 'video',
            durationMinutes: 22,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
            textContent: `### The Modern React Paradigm
React renders UI as a pure projection of application state. In React 18, automatic state batching combines multiple state updates inside asynchronous callbacks into a single re-render cycle, preventing unnecessary DOM thrashing.`,
            codeSnippet: {
              language: 'typescript',
              code: `import React, { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}`
            }
          }
        ]
      }
    ],
    createdAt: '2025-09-01',
    updatedAt: '2026-08-12'
  },
  {
    id: 'crs_math301',
    title: 'Multivariable Calculus & Linear Algebra',
    subtitle: 'Vector calculus, gradients, multiple integrals, eigenvalues, and transformations for scientific modeling.',
    description: 'A rigorous exploration of multidimensional mathematical tools essential for engineering, physical sciences, and modern machine learning. Topics include partial differentiation, directional derivatives, multiple integration, vector fields, matrix decompositions, and eigenspaces.',
    subject: 'Mathematics',
    difficulty: 'Advanced',
    instructorId: 'usr_teacher_2',
    instructorName: 'Prof. Marcus Brody',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Professor of Physics & Applied Mathematics',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 48,
    rating: 4.95,
    reviewCount: 184,
    enrolledCount: 650,
    status: 'published',
    featured: true,
    learningObjectives: [
      'Compute partial derivatives, gradient vectors, and Hessian matrices for multivariable optimization',
      'Evaluate double and triple integrals using Cartesian, cylindrical, and spherical coordinates',
      'Compute eigenvalues, eigenvectors, and perform Singular Value Decomposition (SVD)',
      'Apply Green’s, Stokes’, and Divergence theorems to physical vector fields'
    ],
    requirements: [
      'Single-variable calculus (derivatives and definite integrals)',
      'Basic matrix algebra'
    ],
    modules: [
      {
        id: 'mod_math301_1',
        courseId: 'crs_math301',
        title: 'Module 1: Multidimensional Differentiation & Gradients',
        description: 'Directional derivatives, tangent planes, Lagrange multipliers, and Taylor approximations.',
        order: 1,
        lessons: [
          {
            id: 'les_math301_101',
            moduleId: 'mod_math301_1',
            courseId: 'crs_math301',
            title: '1.1 The Gradient Vector & Directional Derivatives',
            description: 'Geometric interpretation of the gradient as the direction of steepest ascent in scalar fields.',
            type: 'video',
            durationMinutes: 28,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
            textContent: `### Directional Derivatives and Gradients
For a continuously differentiable scalar field $f(x, y, z)$, the gradient vector $\\nabla f$ is defined as:
$$\\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right)$$

The directional derivative along unit vector $\\mathbf{u}$ is:
$$D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u} = \\|\\nabla f\\| \\cos \\theta$$
The maximum rate of increase occurs when $\\mathbf{u}$ is parallel to $\\nabla f$ ($\\\\theta = 0$).`,
            knowledgeCheck: [
              {
                id: 'kc_math_1',
                question: 'What is the directional derivative of f in a direction orthogonal to the gradient vector ∇f?',
                options: ['1', '0', '||∇f||', 'Undefined'],
                correctIndex: 1,
                explanation: 'Since D_u f = ∇f · u and the dot product of two orthogonal vectors is 0, the directional derivative is 0.'
              }
            ]
          }
        ]
      }
    ],
    createdAt: '2025-07-15',
    updatedAt: '2026-08-05'
  },
  {
    id: 'crs_phys201',
    title: 'Classical Mechanics & Electromagnetism',
    subtitle: 'Newtonian dynamics, Lagrangian formulations, Maxwell equations, and electromagnetic wave propagation.',
    description: 'Explore the fundamental principles governing physical motion and electromagnetic fields. Covers rotational dynamics, harmonic oscillators, central force fields, Gauss’s Law, Faraday’s induction, and wave optics.',
    subject: 'Physics',
    difficulty: 'Intermediate',
    instructorId: 'usr_teacher_2',
    instructorName: 'Prof. Marcus Brody',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Professor of Physics & Applied Mathematics',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 40,
    rating: 4.88,
    reviewCount: 142,
    enrolledCount: 520,
    status: 'published',
    featured: false,
    learningObjectives: [
      'Formulate equations of motion using Newtonian and Lagrangian mechanics',
      'Solve driven and damped harmonic oscillator differential equations',
      'Apply Gauss’s Law, Ampere’s Law, and Faraday’s Law to symmetric charge and current distributions',
      'Derive the wave equation from Maxwell’s equations in free space'
    ],
    requirements: [
      'Introductory Physics',
      'Calculus II (integration techniques)'
    ],
    modules: [
      {
        id: 'mod_phys201_1',
        courseId: 'crs_phys201',
        title: 'Module 1: Oscillations & Central Force Motion',
        description: 'Simple harmonic motion, damping, resonance, and planetary orbits.',
        order: 1,
        lessons: [
          {
            id: 'les_phys201_101',
            moduleId: 'mod_phys201_1',
            courseId: 'crs_phys201',
            title: '1.1 Damped and Driven Harmonic Oscillators',
            description: 'Analyzing restoring forces, viscous damping coefficients, and resonance phenomena.',
            type: 'video',
            durationMinutes: 26,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
            textContent: `### Harmonic Oscillator Equations of Motion
The differential equation for a mass $m$ on a spring with constant $k$ and damping $b$ driven by force $F(t) = F_0 \\cos(\\omega t)$ is:
$$m \\frac{d^2 x}{dt^2} + b \\frac{dx}{dt} + k x = F_0 \\cos(\\omega t)$$
Natural frequency $\\omega_0 = \\sqrt{k/m}$. At $\\omega \\approx \\omega_0$, amplitude peaks in resonance.`,
            knowledgeCheck: [
              {
                id: 'kc_phys_1',
                question: 'What happens to the oscillation frequency in an underdamped harmonic system compared to the undamped natural frequency?',
                options: ['It increases', 'It decreases slightly', 'It remains exactly identical', 'It becomes infinite'],
                correctIndex: 1,
                explanation: 'Damping slows down the oscillation slightly: ω_d = √(ω_0^2 - γ^2).'
              }
            ]
          }
        ]
      }
    ],
    createdAt: '2025-08-18',
    updatedAt: '2026-07-29'
  },
  {
    id: 'crs_bio101',
    title: 'Molecular Biology & Genetics',
    subtitle: 'DNA replication, transcription, translation, CRISPR gene editing, and cellular metabolic pathways.',
    description: 'An inspiring journey through molecular biology and modern genetic engineering. From the structural chemistry of nucleic acids and proteins to gene expression regulation, epigenetics, and biotechnology applications.',
    subject: 'Biology',
    difficulty: 'Beginner',
    instructorId: 'usr_teacher_3',
    instructorName: 'Ms. Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Senior Lecturer in Biological Sciences',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 32,
    rating: 4.92,
    reviewCount: 270,
    enrolledCount: 1150,
    status: 'published',
    featured: true,
    learningObjectives: [
      'Explain the Central Dogma of molecular biology (DNA -> RNA -> Protein)',
      'Detail enzyme mechanisms in semi-conservative DNA replication',
      'Understand transcription factors, promoter regions, and mRNA processing in eukaryotes',
      'Explore CRISPR-Cas9 genome editing mechanisms and bioinformatics analysis'
    ],
    requirements: [
      'High school chemistry or general biology'
    ],
    modules: [
      {
        id: 'mod_bio101_1',
        courseId: 'crs_bio101',
        title: 'Module 1: Nucleic Acids & The Central Dogma',
        description: 'Double helix structure, base pairing rules, and transcription mechanisms.',
        order: 1,
        lessons: [
          {
            id: 'les_bio101_101',
            moduleId: 'mod_bio101_1',
            courseId: 'crs_bio101',
            title: '1.1 The Double Helix & Semi-Conservative Replication',
            description: 'Watson-Crick base pairing, DNA polymerases, helicase, and Okazaki fragments on the lagging strand.',
            type: 'video',
            durationMinutes: 25,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
            textContent: `### The Molecular Architecture of DNA
DNA comprises two anti-parallel polynucleotide chains wound in a right-handed double helix. Nitrogenous bases pair specifically via hydrogen bonds:
* **Adenine (A)** pairs with **Thymine (T)** (2 hydrogen bonds)
* **Guanine (G)** pairs with **Cytosine (C)** (3 hydrogen bonds)

Replication proceeds 5' to 3', creating a continuous leading strand and discontinuous Okazaki fragments on the lagging strand synthesized via RNA primers and joined by DNA Ligase.`,
            knowledgeCheck: [
              {
                id: 'kc_bio_1',
                question: 'Which enzyme is responsible for unwinding the DNA double helix at the replication fork?',
                options: ['DNA Polymerase III', 'Helicase', 'Topoisomerase', 'RNA Primase'],
                correctIndex: 1,
                explanation: 'Helicase breaks the hydrogen bonds between complementary base pairs to unwind the DNA double helix.'
              }
            ]
          }
        ]
      }
    ],
    createdAt: '2025-08-01',
    updatedAt: '2026-08-14'
  },
  {
    id: 'crs_ai401',
    title: 'Introduction to Artificial Intelligence & Neural Networks',
    subtitle: 'Perceptrons, backpropagation, convolutional networks, transformers, and ethical AI deployment.',
    description: 'Comprehensive introduction to artificial intelligence, machine learning principles, neural network architectures, computer vision, natural language processing, and responsible AI practices.',
    subject: 'Computer Science',
    difficulty: 'Advanced',
    instructorId: 'usr_teacher_1',
    instructorName: 'Dr. Eleanor Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'Associate Professor of Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    estimatedHours: 50,
    rating: 4.96,
    reviewCount: 390,
    enrolledCount: 1890,
    status: 'published',
    featured: true,
    learningObjectives: [
      'Understand loss functions, gradient descent optimization, and backpropagation mechanics',
      'Construct multi-layer perceptrons (MLP) and Convolutional Neural Networks (CNNs)',
      'Analyze Self-Attention mechanisms and Transformer architectures',
      'Evaluate model bias, hallucination mitigation, and fairness metrics in deployed AI'
    ],
    requirements: [
      'Python programming',
      'Basic linear algebra (matrix multiplication) and calculus (chain rule)'
    ],
    modules: [
      {
        id: 'mod_ai401_1',
        courseId: 'crs_ai401',
        title: 'Module 1: Foundations of Deep Learning',
        description: 'Perceptrons, activation functions, loss landscapes, and backpropagation mathematics.',
        order: 1,
        lessons: [
          {
            id: 'les_ai401_101',
            moduleId: 'mod_ai401_1',
            courseId: 'crs_ai401',
            title: '1.1 The Artificial Neuron & Activation Functions',
            description: 'From biological synapses to artificial neurons: ReLU, Sigmoid, GELU, and forward propagation.',
            type: 'video',
            durationMinutes: 32,
            order: 1,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
            textContent: `### The Artificial Neuron Mathematical Model
An artificial neuron computes a weighted linear combination of inputs followed by a non-linear activation function:
$$z = \\sum_{i=1}^n w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b$$
$$a = \\sigma(z)$$

Common Activations:
* **ReLU (Rectified Linear Unit):** $f(z) = \\max(0, z)$ (prevents vanishing gradients)
* **Sigmoid:** $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ (squashes to $(0, 1)$ range)
* **GELU (Gaussian Error Linear Unit):** Standard in modern LLMs and Transformers.`,
            codeSnippet: {
              language: 'python',
              code: `import numpy as np

def relu(z):
    return np.maximum(0, z)

def forward_pass(X, W1, b1, W2, b2):
    # Layer 1
    Z1 = np.dot(X, W1) + b1
    A1 = relu(Z1)
    # Output Layer
    Z2 = np.dot(A1, W2) + b2
    return Z2`
            }
          }
        ]
      }
    ],
    createdAt: '2025-10-01',
    updatedAt: '2026-08-16'
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr_alex_cs101',
    userId: 'usr_student_1',
    courseId: 'crs_cs101',
    enrolledAt: '2026-01-15T09:00:00Z',
    progressPercentage: 75,
    completedLessons: ['les_cs101_101', 'les_cs101_102', 'les_cs101_201'],
    lastAccessedLessonId: 'les_cs101_202',
    lastAccessedAt: '2026-08-18T10:30:00Z',
    grade: 92.5,
    letterGrade: 'A'
  },
  {
    id: 'enr_alex_web201',
    userId: 'usr_student_1',
    courseId: 'crs_web201',
    enrolledAt: '2026-02-01T10:00:00Z',
    progressPercentage: 100,
    completedLessons: ['les_web201_101'],
    lastAccessedLessonId: 'les_web201_101',
    lastAccessedAt: '2026-08-15T16:00:00Z',
    completedAt: '2026-08-15T16:30:00Z',
    grade: 96.0,
    letterGrade: 'A+'
  },
  {
    id: 'enr_alex_ai401',
    userId: 'usr_student_1',
    courseId: 'crs_ai401',
    enrolledAt: '2026-04-10T14:00:00Z',
    progressPercentage: 40,
    completedLessons: ['les_ai401_101'],
    lastAccessedLessonId: 'les_ai401_101',
    lastAccessedAt: '2026-08-17T11:20:00Z',
    grade: 88.0,
    letterGrade: 'B+'
  },
  {
    id: 'enr_maya_bio101',
    userId: 'usr_student_2',
    courseId: 'crs_bio101',
    enrolledAt: '2026-01-10T08:00:00Z',
    progressPercentage: 90,
    completedLessons: ['les_bio101_101'],
    lastAccessedLessonId: 'les_bio101_101',
    lastAccessedAt: '2026-08-17T18:00:00Z',
    grade: 95.0,
    letterGrade: 'A'
  },
  {
    id: 'enr_liam_math301',
    userId: 'usr_student_3',
    courseId: 'crs_math301',
    enrolledAt: '2026-02-15T11:00:00Z',
    progressPercentage: 60,
    completedLessons: ['les_math301_101'],
    lastAccessedLessonId: 'les_math301_101',
    lastAccessedAt: '2026-08-18T09:10:00Z',
    grade: 89.5,
    letterGrade: 'B+'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_cs101_1',
    courseId: 'crs_cs101',
    moduleId: 'mod_cs101_1',
    title: 'Assignment 1: High-Performance LRU Cache Implementation',
    instructions: `### Objective
Design and implement an in-memory Least Recently Used (LRU) Cache in TypeScript/JavaScript or Python that supports $O(1)$ \`get(key)\` and \`put(key, value)\` runtime complexity.

### Technical Requirements:
1. Combine a Doubly Linked List with a Hash Map.
2. Evict the least recently used item when cache exceeds capacity.
3. Include unit tests demonstrating edge cases (capacity 1, repeated updates, evictions).
4. Provide a brief (250-word) PDF report analyzing time/space complexity tradeoffs.`,
    dueDate: '2026-08-25T23:59:00Z',
    maxPoints: 100,
    allowedFileTypes: ['.ts', '.js', '.py', '.pdf', '.zip'],
    weightPercent: 15,
    status: 'published',
    rubric: [
      { id: 'rub_1', title: 'O(1) Time Complexity Guarantee', description: 'Both get and put operations run in strict O(1) time using doubly linked list pointers.', maxPoints: 40 },
      { id: 'rub_2', title: 'Code Quality & Clean Architecture', description: 'Modular class design, type annotations, descriptive variable names, and error handling.', maxPoints: 30 },
      { id: 'rub_3', title: 'Comprehensive Unit Test Suite', description: 'Tests covering capacity bounds, eviction order, and non-existent keys.', maxPoints: 20 },
      { id: 'rub_4', title: 'Complexity Analysis Document', description: 'Clear write-up on amortized cost and heap allocation behavior.', maxPoints: 10 }
    ],
    attachments: [
      { id: 'att_1', title: 'LRU-Cache-Starter-Kit.zip', type: 'code', url: '#', size: '1.4 MB' }
    ]
  },
  {
    id: 'asg_web201_1',
    courseId: 'crs_web201',
    moduleId: 'mod_web201_1',
    title: 'Assignment 2: Interactive Data Dashboard with Accessible UI',
    instructions: `### Objective
Build a responsive, accessible single-page analytical dashboard utilizing React, Tailwind CSS, and Recharts or D3.

### Requirements:
1. Interactive time-series and categorical charts.
2. Fully accessible (WCAG AA compliant contrast and keyboard navigation).
3. Dark/Light mode toggle with smooth visual transitions.
4. Filterable and sortable data table with pagination.`,
    dueDate: '2026-08-28T23:59:00Z',
    maxPoints: 100,
    allowedFileTypes: ['.zip', '.pdf', '.tar.gz'],
    weightPercent: 20,
    status: 'published',
    rubric: [
      { id: 'rub_w1', title: 'UI Aesthetics & Design System', description: 'Consistent typography, spacing tokens, and color harmonies.', maxPoints: 35 },
      { id: 'rub_w2', title: 'Data Visualizations & Interactivity', description: 'Smooth chart animations, tooltips, and dynamic filtering.', maxPoints: 35 },
      { id: 'rub_w3', title: 'Accessibility & Responsive Layout', description: 'Semantic HTML, ARIA attributes, and fluid mobile breakpoints.', maxPoints: 30 }
    ]
  },
  {
    id: 'asg_ai401_1',
    courseId: 'crs_ai401',
    moduleId: 'mod_ai401_1',
    title: 'Assignment 1: Neural Network Backpropagation from Scratch',
    instructions: `Implement a 2-layer neural network with forward pass, cross-entropy loss, and manual gradient descent backpropagation using only NumPy (no PyTorch/TensorFlow for core calculations). Train on synthetic non-linear classification data.`,
    dueDate: '2026-09-02T23:59:00Z',
    maxPoints: 100,
    allowedFileTypes: ['.ipynb', '.py', '.pdf'],
    weightPercent: 25,
    status: 'published',
    rubric: [
      { id: 'rub_ai1', title: 'Mathematical Gradient Derivation', description: 'Correct matrix calculus chain rule implementation.', maxPoints: 50 },
      { id: 'rub_ai2', title: 'Model Convergence & Accuracy', description: 'Achieving >95% accuracy on decision boundary test split.', maxPoints: 30 },
      { id: 'rub_ai3', title: 'Analysis & Loss Curves', description: 'Plotting training loss progression and learning rate experiments.', maxPoints: 20 }
    ]
  }
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub_alex_cs101_1',
    assignmentId: 'asg_cs101_1',
    userId: 'usr_student_1',
    studentName: 'Alex Chen',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    courseId: 'crs_cs101',
    submittedAt: '2026-08-16T19:30:00Z',
    status: 'graded',
    textSubmission: 'Attached is my complete TypeScript implementation of the LRU Cache combining Map and DoublyLinkedList with 18 Jest test cases and benchmarking report.',
    files: [
      { name: 'lru-cache-alex-chen.zip', size: '2.1 MB', url: '#' },
      { name: 'complexity-analysis-report.pdf', size: '420 KB', url: '#' }
    ],
    score: 95,
    feedback: 'Outstanding work Alex! Your doubly-linked list node removal is exceptionally clean and handles the head/tail boundary pointers gracefully. Excellent test suite covering zero-capacity edge conditions.',
    gradedAt: '2026-08-17T14:15:00Z',
    gradedBy: 'Dr. Eleanor Vance',
    rubricScores: [
      { criterionId: 'rub_1', score: 38, comment: 'Strict O(1) verified.' },
      { criterionId: 'rub_2', score: 29, comment: 'Clean TypeScript types and interfaces.' },
      { criterionId: 'rub_3', score: 20, comment: '100% test coverage.' },
      { criterionId: 'rub_4', score: 8, comment: 'Good analysis of GC overhead.' }
    ]
  },
  {
    id: 'sub_maya_web201_1',
    assignmentId: 'asg_web201_1',
    userId: 'usr_student_2',
    studentName: 'Maya Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    courseId: 'crs_web201',
    submittedAt: '2026-08-18T08:15:00Z',
    status: 'submitted',
    textSubmission: 'Submitted my medical bioinformatics dashboard repository and demo link.',
    files: [
      { name: 'genomics-dashboard-app.zip', size: '4.8 MB', url: '#' }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'q_cs101_m1',
    courseId: 'crs_cs101',
    moduleId: 'mod_cs101_1',
    title: 'Quiz 1: Data Structures & Algorithmic Complexity',
    description: 'Test your mastery of Big-O asymptotic analysis, array memory layouts, pointer structures, and recursion.',
    timeLimitMinutes: 20,
    passingScorePercentage: 70,
    maxAttempts: 3,
    weightPercent: 10,
    questions: [
      {
        id: 'q1_1',
        type: 'multiple_choice',
        question: 'Which of the following data structures provides O(1) worst-case time complexity for accessing an element by index?',
        points: 10,
        options: ['Singly Linked List', 'Static Array', 'Binary Search Tree', 'Min-Heap'],
        correctAnswer: 1,
        explanation: 'Static arrays store elements in contiguous memory addresses, allowing direct calculation of memory offsets in O(1) time.'
      },
      {
        id: 'q1_2',
        type: 'multiple_select',
        question: 'Select all sorting algorithms that have an average time complexity of O(N log N):',
        points: 15,
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort', 'Selection Sort'],
        correctAnswer: [0, 1, 3],
        explanation: 'Merge Sort, Quick Sort, and Heap Sort all exhibit O(N log N) average runtime. Bubble and Selection sort are O(N²).'
      },
      {
        id: 'q1_3',
        type: 'true_false',
        question: 'Inserting a node at the head of a singly linked list is an O(N) operation.',
        points: 10,
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'False. Inserting at the head only requires updating the new node\'s next pointer and head reference, taking O(1) time.'
      },
      {
        id: 'q1_4',
        type: 'short_answer',
        question: 'What is the Big-O time complexity of finding the maximum element in a Max-Heap?',
        points: 10,
        correctAnswer: 'O(1)',
        explanation: 'In a Max-Heap, the maximum element is always maintained at the root node, allowing O(1) direct retrieval.'
      },
      {
        id: 'q1_5',
        type: 'fill_blank',
        question: 'A hash collision resolution strategy that stores colliding elements in a linked list at each bucket index is called ________ chaining.',
        points: 15,
        correctAnswer: 'separate',
        explanation: 'Separate chaining stores collided key-value pairs in a linked list or secondary tree at each hash bucket index.'
      }
    ]
  },
  {
    id: 'q_web201_m1',
    courseId: 'crs_web201',
    moduleId: 'mod_web201_1',
    title: 'Quiz: React Hooks & Component Architecture',
    description: 'Assess your understanding of React 18 hooks, rendering lifecycles, and performance optimization.',
    timeLimitMinutes: 15,
    passingScorePercentage: 75,
    maxAttempts: 2,
    weightPercent: 10,
    questions: [
      {
        id: 'qw_1',
        type: 'multiple_choice',
        question: 'What does the dependency array in useEffect([]) indicate when left empty?',
        points: 10,
        options: [
          'The effect runs on every single render cycle',
          'The effect runs only once after the initial mount',
          'The effect never runs',
          'The effect runs only before component unmount'
        ],
        correctAnswer: 1,
        explanation: 'An empty dependency array indicates no reactive variables, causing the effect to run only once after initial mount.'
      },
      {
        id: 'qw_2',
        type: 'true_false',
        question: 'React 18 automatically batches state updates inside setTimeout and async Promise handlers.',
        points: 10,
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'True. React 18 introduced automatic batching for all asynchronous callbacks including promises, timeouts, and native event handlers.'
      }
    ]
  }
];

export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att_alex_q1',
    quizId: 'q_cs101_m1',
    userId: 'usr_student_1',
    courseId: 'crs_cs101',
    startedAt: '2026-08-14T15:00:00Z',
    completedAt: '2026-08-14T15:16:30Z',
    score: 55,
    totalPoints: 60,
    percentage: 91.7,
    passed: true,
    answers: {
      'q1_1': 1,
      'q1_2': [0, 1, 3],
      'q1_3': 1,
      'q1_4': 'O(1)',
      'q1_5': 'separate'
    }
  }
];

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'disc_1',
    courseId: 'crs_cs101',
    authorId: 'usr_student_1',
    authorName: 'Alex Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    title: 'Clarification on Amortized Resizing in Dynamic Arrays vs Linked List Overhead',
    content: 'In Lesson 1.2, we discussed that dynamic arrays have an amortized cost of O(1) for appending, whereas linked lists have an unconditional O(1) cost. However, in practice, dynamic arrays often benchmark 10x faster due to spatial cache locality. How does cache line prefetching mathematically compensate for the occasional O(N) array copy?',
    tags: ['Complexity', 'Cache Locality', 'Hardware Architecture'],
    createdAt: '2026-08-16T10:20:00Z',
    isPinned: true,
    isLocked: false,
    isResolved: true,
    posts: [
      {
        id: 'post_1_1',
        threadId: 'disc_1',
        authorId: 'usr_teacher_1',
        authorName: 'Dr. Eleanor Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        authorRole: 'teacher',
        content: 'Great insight Alex! Modern CPUs load entire 64-byte cache lines from L1/L2 memory. Because an array stores elements consecutively, traversing contiguous memory triggers sequential prefetching with virtually zero cache misses. With a linked list, each node pointer dereference causes a cold memory jump (often 50-100 clock cycles of latency). This architectural advantage heavily outweighs the geometric doubling reallocation cost.',
        createdAt: '2026-08-16T11:05:00Z',
        upvotes: 14,
        upvotedBy: ['usr_student_1', 'usr_student_3', 'usr_student_4'],
        isVerifiedAnswer: true
      },
      {
        id: 'post_1_2',
        threadId: 'disc_1',
        authorId: 'usr_student_3',
        authorName: 'Liam Smith',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        authorRole: 'student',
        content: 'Fascinating breakdown! That explains why standard library vectors in C++ and ArrayList in Java are almost always preferred over LinkedList in competitive programming.',
        createdAt: '2026-08-16T12:30:00Z',
        upvotes: 4,
        upvotedBy: ['usr_student_1']
      }
    ]
  },
  {
    id: 'disc_2',
    courseId: 'crs_web201',
    authorId: 'usr_student_4',
    authorName: 'Sofia Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    title: 'Best practices for organizing Tailwind CSS tokens and dark mode colors',
    content: 'When setting up dark mode alongside high-contrast accessibility requirements, what is the best strategy for handling subtle borders and surface elevation without creating visual clutter?',
    tags: ['Tailwind', 'Design Systems', 'Dark Mode'],
    createdAt: '2026-08-17T14:10:00Z',
    isPinned: false,
    isLocked: false,
    isResolved: false,
    posts: [
      {
        id: 'post_2_1',
        threadId: 'disc_2',
        authorId: 'usr_teacher_1',
        authorName: 'Dr. Eleanor Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        authorRole: 'teacher',
        content: 'Stick to layered surface luminance (e.g. slate-950 for canvas, slate-900 for cards, slate-800 for active hover elements) and keep border opacity subtle (border-slate-800/60). Never use high-contrast pure white borders on dark themes.',
        createdAt: '2026-08-17T15:00:00Z',
        upvotes: 8,
        upvotedBy: ['usr_student_4', 'usr_student_1']
      }
    ]
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    conversationId: 'conv_alex_vance',
    senderId: 'usr_teacher_1',
    senderName: 'Dr. Eleanor Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    receiverId: 'usr_student_1',
    content: 'Hi Alex! Just reviewed your LRU Cache submission. Outstanding work on the doubly-linked list node boundaries. Are you planning to join our algorithms research group this semester?',
    timestamp: '2026-08-17T14:20:00Z',
    read: true
  },
  {
    id: 'msg_2',
    conversationId: 'conv_alex_vance',
    senderId: 'usr_student_1',
    senderName: 'Alex Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    receiverId: 'usr_teacher_1',
    content: 'Thank you Dr. Vance! Yes, I would love to join the research lab. I have been reading papers on lock-free concurrent skip lists and would be excited to contribute.',
    timestamp: '2026-08-17T14:45:00Z',
    read: true
  },
  {
    id: 'msg_3',
    conversationId: 'conv_alex_vance',
    senderId: 'usr_teacher_1',
    senderName: 'Dr. Eleanor Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    receiverId: 'usr_student_1',
    content: 'Wonderful! Let us meet during office hours on Thursday at 2:00 PM to discuss the roadmap.',
    timestamp: '2026-08-18T09:00:00Z',
    read: false
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'usr_student_1',
    title: 'Assignment Graded',
    message: 'Dr. Eleanor Vance graded Assignment 1: High-Performance LRU Cache (Score: 95/100).',
    type: 'assignment_graded',
    timestamp: '2026-08-17T14:15:00Z',
    read: false,
    actionPayload: { view: 'assignments', targetId: 'asg_cs101_1' }
  },
  {
    id: 'notif_2',
    userId: 'usr_student_1',
    title: 'Upcoming Due Date',
    message: 'Assignment 2: Interactive Data Dashboard is due in 10 days on Aug 28.',
    type: 'assignment_due',
    timestamp: '2026-08-18T08:00:00Z',
    read: false,
    actionPayload: { view: 'assignments', targetId: 'asg_web201_1' }
  },
  {
    id: 'notif_3',
    userId: 'usr_student_1',
    title: 'Course Announcement',
    message: 'Prof. Marcus Brody published extra practice problems for Multivariable Optimization.',
    type: 'announcement',
    timestamp: '2026-08-16T11:00:00Z',
    read: true,
    actionPayload: { view: 'course_detail', targetId: 'crs_math301' }
  },
  {
    id: 'notif_4',
    userId: 'usr_student_1',
    title: 'Certificate Issued! 🎓',
    message: 'Congratulations! You earned your verified Certificate of Completion for Modern Full-Stack Web Engineering.',
    type: 'certificate_issued',
    timestamp: '2026-08-15T16:35:00Z',
    read: true,
    actionPayload: { view: 'certificates' }
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev_1',
    courseId: 'crs_cs101',
    courseTitle: 'Data Structures & Algorithms',
    title: 'LRU Cache Assignment Due',
    description: 'Submit TypeScript code files and PDF complexity write-up.',
    startDate: '2026-08-25T23:59:00Z',
    type: 'assignment',
    priority: 'high'
  },
  {
    id: 'ev_2',
    courseId: 'crs_web201',
    courseTitle: 'Full-Stack Web Engineering',
    title: 'Interactive Dashboard Assignment Due',
    description: 'Final submission deadline for accessible React dashboard.',
    startDate: '2026-08-28T23:59:00Z',
    type: 'assignment',
    priority: 'medium'
  },
  {
    id: 'ev_3',
    courseId: 'crs_cs101',
    courseTitle: 'Data Structures & Algorithms',
    title: 'Midterm Assessment: Graph Algorithms & Trees',
    description: 'Timed assessment covering BFS, DFS, Dijkstra, and BST rotations.',
    startDate: '2026-08-30T14:00:00Z',
    endDate: '2026-08-30T16:00:00Z',
    type: 'exam',
    priority: 'high'
  },
  {
    id: 'ev_4',
    courseId: 'crs_ai401',
    courseTitle: 'Introduction to AI',
    title: 'Live Lab: Neural Backpropagation Walkthrough',
    description: 'Interactive session debugging tensor calculus derivations.',
    startDate: '2026-08-21T18:00:00Z',
    endDate: '2026-08-21T19:30:00Z',
    type: 'live_session',
    priority: 'medium'
  },
  {
    id: 'ev_5',
    userId: 'usr_student_1',
    title: 'Study Goal: Finish Graph Traversal Module',
    description: 'Personal study session to complete Dijkstra and Topological Sort implementation.',
    startDate: '2026-08-20T16:00:00Z',
    type: 'goal',
    priority: 'low'
  }
];

export const INITIAL_NOTES: StudentNote[] = [
  {
    id: 'note_1',
    userId: 'usr_student_1',
    courseId: 'crs_cs101',
    courseTitle: 'Data Structures & Algorithmic Thinking',
    lessonId: 'les_cs101_101',
    lessonTitle: '1.1 Asymptotic Analysis & Big-O Notation',
    title: 'Big-O Cheat & Master Theorem Review',
    content: `# Key Formulae & Bounds
* Master Theorem: T(n) = aT(n/b) + f(n)
* Compare f(n) with n^(log_b a).
* Case 1: If f(n) < n^(log_b a), T(n) = Θ(n^(log_b a))
* Case 2: If f(n) = n^(log_b a), T(n) = Θ(n^(log_b a) * log n)
* Case 3: If f(n) > n^(log_b a), T(n) = Θ(f(n))

Remember: MergeSort splits in 2 subproblems of size n/2 with O(n) merge work -> Case 2 -> O(n log n).`,
    tags: ['Algorithms', 'Complexity', 'Master Theorem'],
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-08-16T12:00:00Z',
    color: 'amber'
  },
  {
    id: 'note_2',
    userId: 'usr_student_1',
    courseId: 'crs_cs101',
    courseTitle: 'Data Structures & Algorithmic Thinking',
    lessonId: 'les_cs101_202',
    lessonTitle: '2.2 Graph Traversals: BFS, DFS & Shortest Path',
    title: 'Dijkstra vs A* Algorithm Core Notes',
    content: `# Shortest Path Mechanics
* Dijkstra uses a Priority Queue (Min-Heap) ordered by distance from start node.
* Time complexity with binary heap: O((V + E) log V).
* Cannot handle negative weight edges (use Bellman-Ford for negative weights).
* A* incorporates admissible heuristic h(n) <= true distance, pruning search nodes toward target.`,
    tags: ['Graphs', 'Dijkstra', 'Heuristics'],
    createdAt: '2026-08-17T16:20:00Z',
    updatedAt: '2026-08-17T16:45:00Z',
    color: 'emerald'
  }
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm_1',
    userId: 'usr_student_1',
    courseId: 'crs_cs101',
    courseTitle: 'Data Structures & Algorithmic Thinking',
    lessonId: 'les_cs101_202',
    lessonTitle: '2.2 Graph Traversals: BFS, DFS & Shortest Path',
    createdAt: '2026-08-17T16:15:00Z'
  },
  {
    id: 'bm_2',
    userId: 'usr_student_1',
    courseId: 'crs_ai401',
    courseTitle: 'Introduction to Artificial Intelligence',
    lessonId: 'les_ai401_101',
    lessonTitle: '1.1 The Artificial Neuron & Activation Functions',
    createdAt: '2026-08-16T11:30:00Z'
  }
];

export const INITIAL_GOALS: LearningGoal[] = [
  {
    id: 'goal_1',
    userId: 'usr_student_1',
    title: 'Complete Graph Algorithms & Dijkstra implementation',
    description: 'Finish all coding exercises in Module 2 and pass the practice quiz.',
    targetDate: '2026-08-22',
    category: 'Computer Science',
    targetHours: 8,
    currentHours: 6.5,
    progressPercentage: 80,
    isCompleted: false,
    createdAt: '2026-08-10'
  },
  {
    id: 'goal_2',
    userId: 'usr_student_1',
    title: 'Maintain 15-day daily study streak',
    description: 'Spend at least 45 minutes on course lessons and interactive checks every day.',
    targetDate: '2026-08-25',
    category: 'Productivity',
    targetHours: 15,
    currentHours: 14,
    progressPercentage: 93,
    isCompleted: false,
    createdAt: '2026-08-04'
  },
  {
    id: 'goal_3',
    userId: 'usr_student_1',
    title: 'Complete Modern Web Development Certification',
    description: 'Submit final React and API project and attain >90% grade.',
    targetDate: '2026-08-15',
    category: 'Certification',
    targetHours: 36,
    currentHours: 36,
    progressPercentage: 100,
    isCompleted: true,
    createdAt: '2026-07-20'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_alex_web201',
    certificateCode: 'EDU-2026-WEB-8842',
    userId: 'usr_student_1',
    studentName: 'Alex Chen',
    courseId: 'crs_web201',
    courseTitle: 'Modern Full-Stack Web Engineering',
    instructorName: 'Dr. Eleanor Vance',
    issueDate: 'August 15, 2026',
    gradePercentage: 96.0,
    hoursCompleted: 36,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://edupulse.edu/verify/EDU-2026-WEB-8842'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: '2026-08-18T10:15:00Z',
    actorId: 'usr_admin_1',
    actorName: 'Dr. Robert Sterling',
    actorRole: 'admin',
    action: 'USER_ROLE_UPDATED',
    targetType: 'user',
    details: 'Promoted Ms. Sarah Jenkins to Senior Lecturer role permissions.',
    ipAddress: '192.168.1.42'
  },
  {
    id: 'log_2',
    timestamp: '2026-08-17T14:15:00Z',
    actorId: 'usr_teacher_1',
    actorName: 'Dr. Eleanor Vance',
    actorRole: 'teacher',
    action: 'GRADE_PUBLISHED',
    targetType: 'grade',
    details: 'Graded Assignment 1 for Alex Chen (Score: 95/100).',
    ipAddress: '172.16.0.15'
  },
  {
    id: 'log_3',
    timestamp: '2026-08-16T12:00:00Z',
    actorId: 'usr_admin_1',
    actorName: 'Dr. Robert Sterling',
    actorRole: 'admin',
    action: 'SETTINGS_MODIFIED',
    targetType: 'settings',
    details: 'Updated global grading scale boundaries and enabled peer messaging.',
    ipAddress: '192.168.1.42'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  platformName: 'EduPulse Academic LMS',
  supportEmail: 'support@edupulse.edu',
  allowPublicRegistration: true,
  defaultGradingScale: [
    { minPercentage: 93, grade: 'A', gpa: 4.0 },
    { minPercentage: 90, grade: 'A-', gpa: 3.7 },
    { minPercentage: 87, grade: 'B+', gpa: 3.3 },
    { minPercentage: 83, grade: 'B', gpa: 3.0 },
    { minPercentage: 80, grade: 'B-', gpa: 2.7 },
    { minPercentage: 77, grade: 'C+', gpa: 2.3 },
    { minPercentage: 70, grade: 'C', gpa: 2.0 },
    { minPercentage: 60, grade: 'D', gpa: 1.0 },
    { minPercentage: 0, grade: 'F', gpa: 0.0 }
  ],
  enableCourseDiscussions: true,
  enablePeerMessaging: true,
  maintenanceMode: false,
  requireEmailVerification: false
};
