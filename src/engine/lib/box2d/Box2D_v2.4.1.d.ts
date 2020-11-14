/**
 * Box2D_v2.4.1
 * 
 * 
 */


declare namespace Box2D {

    /** dynamic物体被完全模拟 */
    const b2_dynamicBody: 2;
    /** kinematic物体在模拟时以一定的速度运动，但不受力的作用 */
    const b2_kinematicBody: 1;
    /** static物体在模拟时不会运动，就好像它具有无穷大的质量 */
    const b2_staticBody: 0;
    /**
     * 二维向量类
     */
    class b2Vec2 {
        /** x坐标 */
        x: number;
        /** y坐标 */
        y: number;
        constructor(x?: number, y?: number);
        /** 将向量设置为0 */
        SetZero(): void;
        /** 将这个向量设置为特定的坐标。 */
        Set(x?: number, y?: number): void;
        /** 两个向量相加 */
        op_add(v: b2Vec2): void;
        /** 两个向量相减 */
        op_sub(v: b2Vec2): void;
        /** 两个向量相乘 */
        op_mul(num: number): void;
        /** 获取x坐标 */
        get_x(): number;
        /** 获取y坐标 */
        get_y(): number;
        /** 设置x坐标 */
        set_x(value: number): void;
        /** 设置y坐标 */
        set_y(value: number): void;
        /** 获取向量长度 */
        Length(): number;
        /** 获取向量长度的平方 */
        LengthSquared(): number;
        /** 返回该向量是否有效 */
        IsValid(): boolean;
        /** 归一化向量 */
        Normalize(): number;
        /** 获取偏斜向量 */
        Skew(): b2Vec2;
    }
    /**
     * 旋转类
     */
    class b2Rot {
        s: number;
        c: number;
        /** 从弧度中的角度初始化。 */
        constructor(angle: number);
        /** 设置角度 */
        Set(angle: number): void;
        /** 设置为标识旋转。 */
        SetIdentity(): void;
        /** 获取弧度中的角度。 */
        GetAngle(): number;
        /** 获取 x 轴。 */
        GetXAxis(): b2Vec2;
        /**  获取 y 轴。 */
        GetYAxis(): b2Vec2;
    }
    /**
     * world class 管理所有物理实体、动态模拟和异步查询。世界还拥有高效的内存管理设施。
     */
    class b2World {
        /** 创建世界并设置重力 */
        constructor(gravity: b2Vec2);
        /** 注册销毁侦听器。侦听器归您所有，必须保留在范围内。 */
        SetDestructionListener(listener: b2DestructionListener): void;
        /** 注册触点过滤器以提供对碰撞的特定控制。否则，将使用默认筛选器（b2_defaultFilter）。侦听器归您所有，必须保留在范围内。 */
        SetContactFilter(filter: b2ContactFilter): void;
        /** 注册联系人事件侦听器。侦听器归您所有，必须保留在范围内。 */
        SetContactListener(listener: b2ContactListener): void;
        /** 注册调试绘图的程序。在内部使用b2World.DebugDraw方法调用调试绘制函数。调试绘制对象属于您，并且必须保持在作用域内。 */
        SetDebugDraw(debugDraw: b2Draw): void;
        /** 
         * 创建一个给定定义的刚体。没有保留对定义的引用。
         * 警告 : 这个函数在回调期间被锁定。
         */
        CreateBody(def: b2BodyDef): b2Body;
        /** 
         * 破坏一个给定定义的刚体。没有保留对定义的引用。这个函数在回调期间被锁定。 
         * 警告 : 
         *  - 这将自动删除所有相关的形状和关节。
         *  -  这个函数在回调期间被锁定。
         */
        DestroyBody(body: b2Body): void;
        /**
         * 创建一个关节来约束刚体在一起。没有保留对定义的引用。这可能会导致连接的刚体停止碰撞。
         * 警告 : 这个函数在回调期间被锁定。
         */
        CreateJoint(def: b2JointDef): b2Joint;
        /**
         * 摧毁一个关节。这可能会导致连接的刚体开始碰撞。
         * 警告 : 这个函数在回调期间被锁定。
         */
        DestroyJoint(joint: b2Joint): void;
        /**
         * 做一个时间步骤。它执行碰撞检测、集成和约束解。
         * @param timeStep 模拟的时间量，这是不应该改变的。
         * @param velocityIterations 为速度约束求解器。
         * @param positionIterations 为位置约束求解器。
         */
        Step(timeStep: number, velocityIterations: number, positionIterations: number): void;
        /** 手动清除所有实体上的力缓冲器。默认情况下，每次调用 Step 后自动清除强制。通过调用 SetAutoClearForce 修改默认行为。此函数的目的是支持子步进。子步进通常用于在可变帧速率下保持固定大小的时间步进。执行子步进时，您将禁用强制的自动清除，而是在游戏运行一次完成所有子步骤后调用 ClearForce。 */
        ClearForces(): void;
        //DebugDraw(): void;
        /** 调用此选项可绘制形状和其他调试绘制数据。这是有意的不协调。 */
        SetDebugDraw(): void;
        /**
         * 查询世界中可能与提供的 AABB 重叠的所有固定装置。
         * @param callback 用户实现回调类。
         * @param aabb 查询框。
         */
        QueryAABB(callback: b2QueryCallback, aabb: b2AABB): void;
        /** 用光线投射光线路径上的所有刚体。回调函数控制的是最近的点、任意点还是n点。光线投射忽略包含起始点的形状。 */
        RayCast(callback: b2RayCastCallback, point1: b2Vec2, point2: b2Vec2): void;
        /** 获得世界刚体列表。对于返回的刚体，使用b2Body::GetNext获得世界列表中的下一个刚体。nullptr体表示列表的结束。 */
        GetBodyList(): b2Body;
        /** 获得世界联合名单。对于返回的关节，使用b2Joint::GetNext获得世界列表中的下一个关节。nullptr连接表示列表的结束。 */
        GetJointList(): b2Joint;
        /**
         * 获取世界联系人名单。对于返回的联系人，使用b2Contact::GetNext获得世界列表中的下一个联系人。nullptr联系人表示列表的结束。
         * 警告 : 联系人是在时间步的中间创建和销毁的。使用b2ContactListener避免丢失联系人。
         */
        GetContactList(): b2Contact;
        /** 启用/禁用睡眠。 */
        SetAllowSleeping(flag: boolean): void;
        /** 获取是否睡眠 */
        GetAllowSleeping(): boolean;
        /** 启用/禁用热启动。用于测试。 */
        SetWarmStarting(flag: boolean): void;
        /** 获取是否热启动。用于测试 */
        GetWarmStarting(): boolean;
        /** 启用/禁用 连续物理。用于测试。 */
        SetContinuousPhysics(flag: boolean): void;
        /** 获取是否启用连续物理。用于测试。 */
        GetContinuousPhysics(): boolean;
        /** 启用/禁用单步进连续物理。用于测试。 */
        SetSubStepping(flag: boolean): void;
        /** 获取是否启用单步进连续物理。用于测试。 */
        GetSubStepping(): boolean;
        /** 获取宽相代理的数量。 */
        GetProxyCount(): number;
        /** 获取刚体的数量。 */
        GetBodyCount(): number;
        /** 获取关节数。 */
        GetJointCount(): number;
        /** 获取联系人数量（每个联系人可能有 0 个或更多联系点）。 */
        GetContactCount(): number;
        /** 获取动态树的高度。 */
        GetTreeHeight(): number;
        /** 获取动态树的平衡。 */
        GetTreeBalance(): number;
        /** 获取动态树的质量指标。越小越好。最小值为 1。 */
        GetTreeQuality(): number;
        /** 更改全局重力矢量。 */
        SetGravity(gravity: b2Vec2): void;
        /** 获取全局重力矢量。 */
        GetGravity(): b2Vec2;
        /** 世界是否被锁定（在时间步进的中间）。 */
        IsLocked(): boolean;
        /** 设置标志以控制每次时间步后强制的自动清除。 */
        SetAutoClearForces(flag: boolean): void;
        /** 获取控制每次时间步数后自动清除力的标记。 */
        GetAutoClearForces(): boolean;
        /** 转移世界起源。适用于大型世界。身体移位公式是：位置 -= 新来源 */
        ShiftOrigin(newOrigin: b2Vec2): void;
        /** 获取用于测试的联系人管理器。 */
        GetContactManager(): b2ContactManager;
        /** 获取当前配置文件。 */
        GetProfile(): b2Profile;
        /** 
         * 将世界转储到日志文件中。 
         * 警告 : 这应该在时间步数之外调用。
         */
        Dump(): void;
    }
    /**
     * 分析数据。时间以毫秒为单位。
     */
    class b2Profile {
        step: number;
        collide: number;
        solve: number;
        solveInit: number;
        solveVelocity: number;
        solvePosition: number;
        broadphase: number;
        solveTOI: number;
    }
    /**
     * 通讯管理器
     */
    class b2ContactManager {
        AddPair(proxyUserDataA: any, proxyUserDataB: any): void; //void *proxyUserDataA, void *proxyUserDataB
        FindNewContacts(): void;
        Destroy(c: b2Contact): void;
        Collide(): void;
        m_broadPhase: b2BroadPhase;
        m_contactList: b2Contact;
        m_contactCount: number;
        m_contactFilter: b2ContactFilter;
        m_contactListener: b2ContactListener;
        m_allocator: b2BlockAllocator;
    }
    /**
     * AABB查询的回调类。看到b2World:Query
     */
    abstract class b2QueryCallback {
        /** 调用查询AABB中找到的每个fixture。 */
        ReportFixture(fixture: b2Fixture): boolean;
    }
    /**
     * 刚体定义保存构造刚体所需的所有数据。您可以安全地重新使用刚体定义。构造后，形状将添加到主体中。
     */
    class b2BodyDef {
        /** 此构造函数设置刚体定义默认值。 */
        constructor();
        /** 体型：静态、运动或动态。注意：如果动态主体的质量为零，则质量设置为 1。 */
        type: typeof b2_staticBody | typeof b2_kinematicBody | typeof b2_dynamicBody;
        /** 身体的世界地位。避免在原点创建实体，因为这可能会导致许多重叠的形状。 */
        position: b2Vec2;
        /** 身体在弧度中的世界角度。 */
        angle: number;
        /** 身体起源的线性速度在世界上坐标。 */
        linearVelocity: b2Vec2;
        /** 刚体的角速度。 */
        angularVelocity: number;
        /** 采用线性阻尼减小线速度。阻尼参数可以大于1.0f，但当阻尼参数较大时，阻尼效果对时间步长变得敏感。单位是1 /时间 */
        linearDamping: number;
        /** 角阻尼是用来降低角速度。阻尼参数可以大于1.0f，但当阻尼参数较大时，阻尼效果对时间步长变得敏感。单位是1 /时间 */
        angularDamping: number;
        /** 如果这个身体不应该入睡，就把这个标志设为假。注意，这会增加CPU的使用。 */
        allowSleep: boolean;
        /** 这个身体最初是清醒的还是睡着的? */
        awake: boolean;
        /** 这个刚体应该被阻止旋转吗?有用的字符。 */
        fixedRotation: boolean;
        /** 
         * 这是不是一个快速移动的刚体，应该防止它穿过其他移动刚体的隧道?注意，所有的刚体都被禁止穿过运动学和静态刚体。此设置仅在动态刚体上考虑。 
         * 警告 :你应该谨慎使用这个标志，因为它会增加处理时间。
         */
        bullet: boolean;
        /** 这个主体一开始是启用的吗? */
        enabled: boolean;
        /** 使用它来存储应用程序特定的主体数据。 */
        userData: any; //b2BodyUserData
        /** 缩放作用于该刚体的重力。 */
        gravityScale: number;
    }
    /**
     * 实现此类以获取联系信息。您可以将这些结果用于声音和游戏逻辑等。您还可以在时间步后遍历联系人列表，以获得联系人结果。但是，您可能会错过一些联系人，因为连续物理导致子步进。此外，您可能会在单个时间步数中收到同一联系人的多个回调。您应该努力使回调高效，因为每个时间步数可能有许多回调。
     * 警告 : 不能在这些回调内创建/销毁 Box2D 实体。
     */
    class b2ContactListener {
        /** 当两个夹具开始接触时调用。 */
        BeginContact(contact: b2Contact): void;
        /** 当两个夹具停止接触时调用。 */
        EndContact(contact: b2Contact): void;
        /** 在更新联系人后调用此选项。这允许您在触点进入解算器之前对其进行检查。如果您小心，可以修改触点歧管（例如禁用触点）。提供了旧歧管的副本，以便检测更改。注意：这仅适用于清醒的身体。注意：即使接触点数为零，也调用此选项。注意：这不需要传感器。注意：如果将接触点数设置为零，则不会收到 EndContact 回调。但是，您可能会得到下一步的 StartContact 回调。 */
        PreSolve(contact: b2Contact, oldManifold: b2Manifold): void;
        /** 这样，您可以在解算器完成后检查触点。这对于检查脉冲很有用。注意：接触歧管不包括冲击脉冲的时间，如果子步小，可以任意大。因此，脉冲在单独的数据结构中显式提供。注意：这仅适用于接触、稳固和清醒的联系人。 */
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void;
    }
    /**
     * 联系报告的冲动。使用脉冲代替力，因为子步力可能接近无限，导致刚体碰撞。这与 b2Manifold 中的接触点进行一对一匹配。
     */
    class b2ContactImpulse {
        normalImpulses: number[];
        tangentImpulses: number[];
        count: number;
    }
    /**
     * 该类管理两个形状之间的接触。宽相中每个重叠的 AABB 存在一个触点（除过滤外）。因此，可能存在没有接触点的接触对象。
     */
    abstract class b2Contact {
        /** 获取接触歧管。除非了解 Box2D 的内部，否则不要修改歧管。 */
        GetManifold(): b2Manifold;
        /** 获取世界的形式 */
        GetWorldManifold(worldManifold: b2WorldManifold): void;
        /** 此接触是否接触？ */
        IsTouching(): boolean;
        /** 启用/禁用此联系人。这可以在预求解接触侦听器内使用。仅禁用当前时间步进（或连续碰撞中的子步）。的触点。 */
        SetEnabled(flag: boolean): void;
        /** 获取世界联系人列表中的下一个联系人。 */
        GetNext(): b2Contact;
        /** 在此联系人中获取夹具 A。 */
        GetFixtureA(): b2Fixture;
        /** 获取夹具 A 的子基元索引。 */
        GetChildIndexA(): number;
        /** 在此联系人中获取夹具 B。 */
        GetFixtureB(): b2Fixture;
        /** 获取夹具 B 的子基元索引。 */
        GetChildIndexB(): number;
        /** 覆盖默认的摩擦混合物。你可以在b2ContactListener.PreSolve中调用它。这个值一直保留到设置或重置为止。 */
        SetFriction(friction: number): void;
        /** 得到摩擦。 */
        GetFriction(): number;
        /** 将摩擦混合物重置为默认值。 */
        ResetFriction(): void;
        /** 覆盖默认的恢复原状混合。你可以在b2ContactListener.PreSolve中调用它。该值一直保留到设置或重置为止。 */
        SetRestitution(restitution: number);
        /** 获得恢复 */
        GetRestitution(): number;
        /** 将恢复重置为默认值。 */
        ResetRestitution();
        /** 覆盖默认的恢复速度阈值混合。你可以在b2ContactListenerPreSolve中调用它。该值一直保留到设置或重置为止。 */
        SetRestitutionThreshold(threshold: number);
        /** 获取恢复速度阈值 */
        GetRestitutionThreshold(): number;
        /** 将恢复阈值重置为默认值。 */
        ResetRestitutionThreshold(): void;
        /** 为传送带行为设置所需的切线速度。以你/秒的速度。 */
        SetTangentSpeed(speed: number): void;
        /** 获得所需的切线速度。以你/秒的速度。 */
        GetTangentSpeed(): number;
        /** 使用您自己的歧管评估此接触并变换。 */
        Evaluate(manifold: b2Manifold, xfA: b2Transform, xfB: b2Transform): void;
        protected static readonly e_islandFlag: 0x0001;
        protected static readonly e_touchingFlag: 0x0002;
        protected static readonly e_enabledFlag: 0x0004;
        protected static readonly e_filterFlag: 0x0008;
        protected static readonly e_bulletHitFlag: 0x0010;
        protected static readonly e_toiFlag: 0x0020;
        /** 标记此联系人以进行筛选。下一个时间步骤将进行筛选。 */
        protected FlagForFiltering(): void;
        protected constructor(fixtureA: b2Fixture, indexA: number, fixtureB: b2Fixture, indexB: number);
        protected Update(listener: b2ContactListener): void;
        protected static AddType(createFcn: any, destroyFcn: any, typeA: number, typeB: number): void; //b2ContactCreateFcn -- b2ContactDestroyFcn
        protected static InitializeRegisters(): void;
        protected static Create(fixtureA: b2Fixture, indexA: number, fixtureB: b2Fixture, indexB: number, allocator: b2BlockAllocator): b2Contact;
        protected static Destroy(contact: b2Contact, typeA: number, typeB: number, allocator: b2BlockAllocator): void;
        protected static Destroy(contact: b2Contact, allocator: b2BlockAllocator): void;
        protected m_flags: number;
        protected m_prev: b2Contact;
        protected m_next: b2Contact;
        protected m_nodeA: b2ContactEdge;
        protected m_nodeB: b2ContactEdge;
        protected m_fixtureA: b2Fixture;
        protected m_fixtureB: b2Fixture;
        protected m_indexA: number;
        protected m_indexB: number;
        protected m_manifold: b2Manifold;
        protected m_toiCount: number;
        protected m_toi: number;
        protected m_friction: number;
        protected m_restitution: number;
        protected m_restitutionThreshold: number;
        protected m_tangentSpeed: number;
        protected static s_registers: b2ContactRegister[];
        protected static s_initialized: boolean;
    }
    /**
     * 联系人寄存器
     */
    class b2ContactRegister {
        createFcn: any; //b2ContactCreateFcn
        destroyFcn: any; //b2ContactDestroyFcn
        primary: boolean;
    }
    /** 接触边用于在接触图中将实体和触点连接在一起，其中每个实体是一个节点，每个接触是一个边。接触边属于每个附加刚体中维护的双链接列表。每个触点有两个接触节点，每个连接体一个。 */
    class b2ContactEdge {
        /** 提供对附加的其他主体的快速访问。 */
        other: b2Body;
        /** 联系人 */
        contact: b2Contact;
        /** 刚体联系人列表中的上一个联系人边缘 */
        prev: b2ContactEdge;
        /** 刚体联系人列表中的下一个联系人边缘 */
        next: b2ContactEdge;
    }
    /**
     * 这是用来计算一个接触流形的当前状态。
     */
    class b2WorldManifold {
        /** 指向从 A 到 B 的世界矢量 */
        normal: b2Vec2;
        /** 世界联络点（交点） */
        points: b2Vec2[];
        /** 负值表示重叠（以米为单位） */
        separations: number[];
        /** 使用提供的变换评估歧管。这假定从原始状态开始适度运动。这不会改变点计数、脉冲等。半径必须来自生成歧管的形状。 */
        Initialize(manifold: b2Manifold, xfA: b2Transform, radiusA: number, xfB: b2Transform, radiusB: number): void;
    }
    /**
     * 用于两个接触凸形的歧管。Box2D 支持多种类型的触点：
     *  - 剪辑点与半径平面
     *  - 点与半径点（圆）局部点的使用取决于歧管类型： -e_circles： 圆A -e_faceA的局部中心：面A -e_faceB：面的中心B相似 -e_circles：未使用 -e_faceA：多边形上的法线A-e_faceB：多边形上的法线B我们用这种方式存储联系人，以便位置校正可以考虑移动，这对连续物理至关重要。所有联系人方案都应以这些类型之一表示。此结构存储在时间步数之间，因此我们保持小。
     */
    class b2Manifold {
        static readonly e_circles: any; // ?
        static readonly e_faceA: any; // ?
        static readonly e_faceB: any; // ?
        /** 接触点 */
        points: b2ManifoldPoint[];
        /** 不用于类型：e_points */
        localNormal: b2Vec2;
        /** 用法取决于歧管类型 */
        localPoint: b2Vec2;
        /** 类型 */
        type: any; //type
        /** 歧点数 */
        pointCount: number;
    }
    /**
     * 歧管点是属于接触歧管的接触点。它保存与接触点的几何形状和动力学相关的详细信息。局部点的使用取决于歧管类型：-e_circles：圆B-e_faceA的局部中心：圆环的局部中心或多边形的夹点-e_faceB：多边形的夹点A此结构存储在时间步数上，因此我们保持小。注意：脉冲用于内部缓存，可能无法提供可靠的接触力，尤其是高速碰撞。
     */
    class b2ManifoldPoint {
        /** 用法取决于歧管类型 */
        localPoint: b2Vec2;
        /** 非穿透脉冲 */
        normalImpulse: number;
        /** 摩擦脉冲 */
        tangentImpulse: number;
        /** 唯一标识两个形状之间的接触点 */
        id: b2ContactID;
    }
    /**
     * 联系 ID 以方便热启动。
     */
    class b2ContactID {
        cf: b2ContactFeature;
        /** 用于快速比较联系人 ID。 */
        key: number;
    }
    /**
     * 相交形成接触点的要素 这应为 4 字节或更少。
     */
    class b2ContactFeature {
        static readonly e_vertex: 0;
        static readonly e_face: 1;
        /** shapeA 上的特征索引。 */
        indexA: number;
        /** shapeB 上的特征索引。 */
        indexB: number;
        /** shapeA 上的要素类型。 */
        typeA: number;
        /** shapeB 上的要素索引。 */
        typeB: number;
    }
    /**
     * 实现此类以提供冲突筛选。换句话说，如果您希望对联系人创建进行更精细的控制，可以实现此类。
     */
    class b2ContactFilter {
        /** 
         * 如果应在这两个形状之间执行接触计算，请返回 true。
         * 警告 : 出于性能原因，仅在 AAB 开始重叠时调用此选项。
         */
        ShouldCollide(fixtureA: b2Fixture, fixtureB: b2Fixture): boolean;
    }
    /**
     * 关节和固定装置在相关主体被摧毁时被破坏。实现此侦听器，以便您可能取消这些关节和形状的引用。
     */
    abstract class b2DestructionListener {
        /** 当任何夹具由于其父主体的破坏而即将被破坏时调用。 */
        SayGoodbye(joint: b2Joint): void;
        /** 当任何夹具由于其父主体的破坏而即将被破坏时调用。 */
        SayGoodbye(fixture: b2Fixture): void;
    }
    /**
     * 夹具用于将形状附加到主体以进行碰撞检测。固件从其父级继承其转换。夹具可保存其他非几何数据，如摩擦、碰撞过滤器等。夹具通过 b2Body.CreateFixture. 创建
     */
    class b2Fixture {
        /** 得到子级形状的类型。您可以使用这个向下cast到具体的形状。 */
        GetType(): number;
        /** 获取子形状。您可以修改子形状，但不应更改顶点数，因为这会崩溃某些冲突缓存机制。操作形状可能会导致非物理行为。 */
        GetShape(): b2Shape;
        /** 设置此夹具是否为传感器。 */
        SetSensor(sensor: boolean): void;
        /** 此夹具是否为传感器（非固体）？ */
        IsSensor(): boolean;
        /** 设置联系人筛选数据。这将不会更新联系人，直到下一个时间步骤时，任一父体处于活动状态和唤醒。这会自动调用回filter。 */
        SetFilterData(filter: b2Filter): void;
        /** 获取联系人筛选数据。 */
        GetFilterData(): b2Filter;
        /** 如果你想建立之前被b2ContactFilter.ShouldCollide禁用的冲突，调用这个。 */
        Refilter(): void;
        /** 获取此fixture的父主体。如果没有附加fixture，则为null。 */
        GetBody(): b2Body;
        /** 获取父主体的fixture列表中的下一个fixture。 */
        GetNext(): b2Fixture;
        /** 获取在fixture定义中分配的用户数据。使用它存储应用程序特定的数据。 */
        GetUserData(): any; //b2FixtureUserData
        /** 在此夹具中测试包含点。 */
        TestPoint(p: b2Vec2): boolean;
        /** 针对此形状投射光线。 */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, childIndex: number): boolean;
        /** 获取此夹具的质量数据。质量数据基于密度和形状。旋转惯性与形状原点有关。此操作可能非常昂贵。 */
        GetMassData(massData: b2MassData): void;
        /** 设置此夹具的密度。这不会自动调整身体的质量。您必须调用 b2Body：：ResetMassData 来更新身体的质量。 */
        SetDensity(density: number): void;
        /** 获取此夹具的密度。 */
        GetDensity(): number;
        /** 获取摩擦系数。 */
        GetFriction(): number;
        /** 设置摩擦系数。这不会改变现有触点的摩擦。 */
        SetFriction(friction: number): void;
        /** 获取恢复系数。 */
        GetRestitution(): number;
        /** 设置恢复系数。这不会改变恢复现有联系。 */
        SetRestitution(restitution: number): void;
        /** 获得恢复速度阈值。 */
        GetRestitutionThreshold(): void;
        /** 设置恢复速度阈值。这不会改变现有联系人的恢复阈值。 */
        SetRestitutionThreshold(threshold: number): void;
        /** 获取夹具的 Aabb 。此 AABB 可能会放大和/或过时。如果您需要更准确的 AABB，它会使用形状和刚体变换来计算它。 */
        GetAABB(childIndex: number): b2AABB;
        /** 将此固件转储到日志文件。 */
        Dump(bodyIndex: number): void;
        protected m_density: number;
        protected m_next: b2Fixture;
        protected m_body: b2Body;
        protected m_shape: b2Shape;
        protected m_friction: number;
        protected m_restitution: number;
        protected m_restitutionThreshold: number;
        protected m_proxies: b2FixtureProxy;
        protected m_proxyCount: number;
        protected m_filter: b2Filter;
        protected m_isSensor: boolean;
        protected m_userData: any; //b2FixtureUserData
        protected Create(allocator: b2BlockAllocator, body: b2Body, def: b2FixtureDef): void;
        protected Destroy(allocator: b2BlockAllocator): void;
        protected CreateProxies(broadPhase: b2BroadPhase, xf: b2Transform): void;
        protected DestroyProxies(broadPhase: b2BroadPhase): void;
        protected Synchronize(broadPhase: b2BroadPhase, xf1: b2Transform, xf2: b2Transform): void;
    }
    /**
     * 此代理在内部用于将夹具连接到宽相。
     */
    class b2FixtureProxy {
        aabb: b2AABB;
        fixture: b2Fixture;
        childIndex: number;
        proxyId: number;
    }
    /**
     * 宽相用于计算对和执行卷查询和射线投射。此宽相不持久对。相反，这些报告可能会出现新的对。由客户端使用新对并跟踪后续重叠。
     */
    class b2BroadPhase<T> {
        static readonly e_nullProxy: -1;
        /** 使用初始 AABB 创建代理。在调用更新派之前，不会报告对。 */
        CreateProxy(aabb: b2AABB, userData: any): number; //userData: void userData
        /** 销毁代理。由客户端删除任何对。 */
        DestroyProxy(proxyId: number): void;
        /** 您可以多次调用 MoveProxy，然后当您完成呼叫 UpdatePairs 以完成代理对（对于您的时间步数）。 */
        MoveProxy(proxyId: number, aabb: b2AABB, displacement: b2Vec2): void;
        /** 调用以触发在下次调用 UpdatePairs 时重新处理其对。 */
        TouchProxy(proxyId: number): void;
        /** 获取代理的脂肪 AABB 。 */
        GetFatAABB(proxyId: number): b2AABB;
        /** 从代理获取用户数据。如果 ID 无效，则返回 invalidptr。 */
        GetUserData(proxyId: number): void;
        /** 测试脂肪ABB的重叠。 */
        TestOverlap(proxyIdA: number, proxyIdB: number): boolean;
        /** 获取代理的数量。 */
        GetProxyCount(): number;
        /** 更新对。这将导致对回调。这只能添加对。 */
        UpdatePairs(callback: T): void;
        /** 查询 AABB 的重叠代理。对于与提供的 AABB 重叠的每个代理，调用回调类。 */
        Query(callback: T, aabb: b2AABB): void;
        /** 对树上的代理进行射线投射。这依赖于回调执行精确的射线投射，在这种情况下，代理包含一个形状。回调还执行任何冲突筛选。这的性能大致等于 k*log（n），其中 k 是冲突数，n 是树中的代理数。 */
        RayCast(callback: T, input: b2RayCastInput): void;
        /** 获取嵌入树的高度。 */
        GetTreeHeight(): number;
        /** 获取嵌入树的平衡。 */
        GetTreeBalance(): number;
        /** 获取嵌入树的质量指标。 */
        GetTreeQuality(): number;
        /** 转移世界起源。适用于大型世界。移位公式为：位置 -= 新来源 */
        ShiftOrigin(newOrigin: b2Vec2): void;
    }
    /**
     * 夹具定义用于创建夹具。此类定义抽象固件定义。您可以安全地重用夹具定义。
     */
    class b2FixtureDef {
        /** 形状，必须设置。将克隆形状，因此可以在堆栈上创建形状。 */
        shape: b2Shape;
        /** 使用此来存储应用程序特定的夹具数据。 */
        userData: any; //b2FixtureUserData
        /** 摩擦系数，通常在 [0-1] 范围内。 */
        friction: number;
        /** 恢复（弹性）通常在[0-1]范围内。 */
        restitution: number;
        /** 恢复速度阈值，通常以 m/s 表示。超过此速度的碰撞已应用恢复（将反弹）。 */
        restitutionThreshold: number;
        /** 密度，通常以千克/米=2表示。 */
        density: number;
        /** 传感器形状收集联系信息，但从不生成碰撞响应。 */
        isSensor: boolean;
        /** 联系人筛选数据。 */
        filter: b2Filter;
        /** 构造函数设置默认固件定义值。 */
        constructor();
    }
    /**
     * 它保存联系人筛选数据。
     */
    class b2Filter {
        /** 冲突类别位。通常，你只会设置一个位。 */
        categoryBits: number;
        /** 碰撞组允许特定组对象从不碰撞（负）或始终碰撞（正）。零没有冲突组。非零组筛选始终对掩码位获利。 */
        maskBits: number;
        /** 碰撞掩码位。这些表示此形状将接受碰撞的类别。 */
        groupIndex: number;
    }
    /**
     * 形状类
     * 形状用于碰撞检测。您可以创建您喜欢的形状。在创建 b2Fixture 时，将自动创建用于 b2World 中模拟的形状。形状可以封装一个或多个子形状。
     */
    abstract class b2Shape {
        static readonly e_circle: 0;
        static readonly e_edge: 1;
        static readonly e_polygon: 2;
        static readonly e_chain: 3;
        static readonly e_typeCount: 4;
        m_type: number;
        /** 一个形状的半径。对于多边形形状，这个必须是b2_polygonRadius。没有制作圆角多边形的支持。 */
        m_radius: number;
        /** 使用提供的分配器克隆具体形状。 */
        Clone(allocator: b2BlockAllocator): b2Shape;
        /** 得到这种形状的类型。您可以使用这个向下cast到具体的形状。 */
        GetType(): number;
        /** 获取子级的数量。 */
        GetChildCount(): number;
        /** 测试这个形状的容器点。这只适用于凸型。 */
        TestPoint(xf: b2Transform, p: b2Vec2): boolean;
        /** 投射一道射线线在一个子节点的身上。 */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, transform: b2Transform, childIndex: number): boolean;
        /** 给定一个转换，计算子形状相关的轴对齐边框。 */
        ComputeAABB(aabb: b2AABB, xf: b2Transform, childIndex: number): void;
        /** 用它的尺寸和密度计算这个形状的质量特性。惯性张量是关于局域原点计算的。 */
        ComputeMass(massData: b2MassData, density: number): void;
    }
    /**
     * 它保存为一个形状计算的大量数据。
     */
    class b2MassData {
        /** 重量形状的质量，通常以公斤为单位 */
        mass: number;
        /** 形状的质心相对于形状的原点的位置。 */
        center: b2Vec2;
        /** 形状关于局部原点的转动惯量。 */
        I: number;
    }
    /**
     * 一个轴对齐的边界框。
     */
    class b2AABB {
        /** 较低的顶点 */
        lowerBound: b2Vec2;
        /** 较高的顶点 */
        upperBound: b2Vec2;
        /** 验证边界是有序的。 */
        IsValid(): boolean;
        /** 获取 AABB 的中心。 */
        GetCenter(): b2Vec2;
        /** 获取 AABB（半宽度）的范围。 */
        GetExtents(): b2Vec2;
        /** 获取周长。 */
        GetPerimeter(): number;
        /** 将 AABB 组合到此中。 */
        Combine(aabb: b2AABB): void;
        /** 将两个 AABB 组合到此一个中。 */
        Combine(aabb1: b2AABB, aabb2: b2AABB): void;
        /** 此 aabb 是否包含提供的 AABB。 */
        Contains(aabb: b2AABB): boolean;
        /** 光线投射 */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput): boolean;
    }
    /**
     * Ray-cast输入数据。射线从p1延伸到p1 + maxFraction * (p2 - p1)。
     */
    class b2RayCastInput {
        p1: b2Vec2;
        p2: b2Vec2;
        maxFraction: number;
    }
    /**
     * Ray-cast输出数据。射线到达p1 + fraction * (p2 - p1)，其中p1和p2来自b2RayCastInput。
     */
    class b2RayCastOutput {
        normal: b2Vec2;
        fraction: number;
    }
    /**
     * 这是一个小对象分配器，用于分配持续多个时间步步的小对象。
     */
    class b2BlockAllocator {
        /** 分配内存。如果大小大于 b2Alloc，这将使用 b2Alloc b2_maxBlockSize。 */
        Allocate(size: number): void;
        /** 空闲内存。如果大小大于b2_maxBlockSize，则使用b2Free。 */
        Free(p: any, size: number): void; //P: void *p
        Clear(): void;
    }
    /**
     * 基本关节类。关节以各种方式将两个实体约束在一起。一些关节还具有限制和汽车。
     */
    abstract class b2Joint {
        /** 获取连接节点的类型 */
        GetType(): any;
        /** 获取第一个刚体 */
        GetBodyA(): b2Body;
        /** 获取第二个刚体 */
        GetBodyB(): b2Body;
        /** 在世界坐标中获得 body A 上的锚点。 */
        GetAnchorA(): b2Vec2;
        /** 在世界坐标中获得 body B 上的锚点。 */
        GetAnchorB(): b2Vec2;
        /** 在关节锚处得到车身b上的反作用力，单位为牛顿。 */
        GetReactionForce(inv_dt: number): b2Vec2;
        /** 以 N*m 获得车身 B 上的反应扭矩。 */
        GetReactionTorque(inv_dt: number): number;
        /** 获取下一个连接类 */
        GetNext(): b2Joint;
        /** 获取用户数据指针。 */
        GetUserData(): any; //b2JointUserData
        /** 短切功能，以确定是否启用了任一主体。 */
        IsEnabled(): boolean;
        /** 连接碰撞。注意：修改碰撞连接标志无法正常工作，因为仅在夹具 AAB 开始重叠时才检查该标志。 */
        GetCollideConnected(): void;
        /** 将此关节转储到日志文件。 */
        Dump(): void;
        /** 移动存储在世界坐标中的任何点的原点。 */
        ShiftOrigin(newOrigin: b2Vec2): void;
        /** 调试绘制当前关节 */
        Draw(draw: b2Draw): void;
        /** 创建一个关节 */
        static Create(def: b2JointDef, allocator): b2Joint;
        /** 销毁一个关节 */
        static Destroy(joint: b2Joint, allocator): void;
        protected constructor(def: b2JointDef);
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        protected m_type: any; //b2JointType 
        protected m_prev: b2Joint;
        protected m_next: b2Joint;
        protected m_edgeA: b2JointEdge;
        protected m_edgeB: b2JointEdge;
        protected m_bodyA: b2Body;
        protected m_bodyB: b2Body;
        protected m_index: number;
        protected m_islandFlag: boolean;
        protected m_collideConnected: boolean;
        protected m_userData: any; //b2JointUserData
    }
    /**
     * 在关节图中，关节边用于将刚体和关节连接在一起，每个刚体是一个节点，每个关节是一条边。连接边属于在每个附加体中维护的双链表。每个关节有两个关节节点，每个连接的刚体有一个。
     */
    class b2JointEdge {
        /** 提供对附加的其他主体的快速访问。 */
        other: b2Body;
        /** 关节 */
        joint: b2Joint;
        /** 身体关节列表中的上一个关节边缘 */
        prev: b2JointEdge;
        /** 身体关节列表中的下一个关节边缘 */
        next: b2JointEdge;
    }
    /**
     * 关节定义用于构造关节。
     */
    class b2JointDef {
        /** 节点类型的设置 */
        type: any; //b2JointType
        /** 使用此功能可将应用程序特定数据附加到关节。 */
        userData: any; //b2JointUserData
        /** 第一个附加的节点 */
        bodyA: b2Body;
        /** 第二个附加的节点 */
        bodyB: b2Body;
        /** 如果附加的实体应发生碰撞，请将此标志设置为 true。 */
        collideConnected: boolean;
    }
    /**
     * 解算器数据
     */
    class b2SolverData {
        step: b2TimeStep;
        positions: b2Position;
        velocities: b2Velocity;
    }
    /**
     * 这是一个内部结构。
     */
    class b2Position {
        c: b2Vec2;
        a: number;
    }
    /**
     * 这是一个内部结构。
     */
    class b2Velocity {
        v: b2Vec2;
        w: number;
    }
    /**
     * 这是一个内部结构。
     */
    class b2TimeStep {
        dt: number;
        inv_dt: number;
        dtRatio: number;
        velocityIterations: number;
        positionIterations: number;
        warmStarting: number;
    }
    /**
     * 刚体类
     */
    class b2Body {
        /** 
         * 创建一个夹具并将其附加到此主体。如果需要设置一些夹具参数（如摩擦），请使用此函数。否则，可以直接从形状创建夹具。如果密度为非零，则此函数会自动更新主体的质量。在下次时间步骤之前不会创建联系人。 
         * 警告 : 此函数在回调期间被锁定。
         */
        CreateFixture(def: b2FixtureDef): b2Filter;
        /** 从形状创建夹具并将其附加到此主体。这是一个方便的功能。如果需要设置摩擦、恢复、用户数据或筛选等参数，请使用 b2FixtureDef。如果密度为非零，则此函数会自动更新主体的质量。 */
        CreateFixture(shape: b2Shape, density: number): b2Filter;
        /**
         * 销毁夹具。这将从宽相中删除夹具，并销毁与此夹具关联的所有触点。如果车身是动态的，并且夹具具有正密度，这将自动调整车身的质量。附着在主体上的所有固定装置在主体被摧毁时都隐式销毁。
         * 警告 : 此函数在回调期间被锁定。
         */
        DestroyFixture(fixture: b2Fixture): void;
        /** 设置身体的原点和旋转位置。操纵身体的转换可能会导致非物理行为。注意:联系人将在下一次调用b2World.step。 */
        SetTransform(position: b2Vec2, angle: number): void;
        /** 获得世界身体的原点位置。 */
        GetPosition(): b2Vec2;
        /** 获取当前时间的角度,已弧度制表示。 */
        GetAngle(): number;
        /** 得到刚体质心的世界位置。 */
        GetWorldCenter(): b2Vec2;
        /** 得到质心的局部位置。 */
        GetLocalCenter(): b2Vec2;
        /** 设置质心的线速度。 */
        SetLinearVelocity(v: b2Vec2): void;
        /** 得到质心的线速度。 */
        GetLinearVelocity(): b2Vec2;
        /** 设置角速度。 */
        SetAngularVelocity(omega: number): void;
        /** 获取角速度。 */
        GetAngularVelocity(): number;
        /** 在世界点施力。如果力不在质心上施加，就会产生扭矩，影响角速度。这会唤醒身体。 */
        ApplyForce(force: b2Vec2, point: b2Vec2, wake: boolean): void;
        /** 对质心施加一个力。这会唤醒身体。 */
        ApplyForceToCenter(force: b2Vec2, wake: boolean): void;
        /** 施加一个力。这影响角速度而不影响质心的线速度。 */
        ApplyTorque(torque: number, wake: boolean): void;
        /** 在一点上施加一个脉冲。这立即改变了速度。如果施加点不在质心上，它也会改变角速度。这会唤醒身体。 */
        ApplyLinearImpulse(impulse: b2Vec2, point: b2Vec2, wake: boolean): void;
        /** 对质心施加一个脉冲。这立即改变了速度。 */
        ApplyLinearImpulseToCenter(impulse: b2Vec2, wake: boolean): void;
        /** 应用角脉冲。 */
        ApplyAngularImpulse(impulse: number, wake: boolean): void;
        /** 求刚体的总质量。 */
        GetMass(): number;
        /** 求刚体绕局部原点的转动惯量。 */
        GetInertia(): number;
        /** 获取刚体的大量数据。 */
        GetMassData(data: b2MassData): void;
        /** 设置质量属性以覆盖装置的质量属性。注意，这改变了质心的位置。注意，创建或销毁固定装置也可以改变质量。如果身体不是动态的，这个函数就没有作用。 */
        SetMassData(data: b2MassData): void;
        /** 这会将质量属性重置为fixture的质量属性的和。这个通常不需要被调用，除非你调用SetMassData来覆盖质量，然后你想要重置质量。 */
        ResetMassData(): void;
        /** 在给定局部坐标的情况下，求一个点的世界坐标。 */
        GetWorldPoint(localPoint: b2Vec2): b2Vec2;
        /** 在给定局部坐标的情况下，求一个向量的全局坐标。 */
        GetWorldVector(localVector: b2Vec2): b2Vec2;
        /** 获取一个相对于给定世界点的身体原点的本地点。 */
        GetLocalPoint(worldPoint: b2Vec2): b2Vec2;
        /** 获取给定全局向量的局部向量。 */
        GetLocalVector(worldVector: b2Vec2): b2Vec2;
        /** 求刚体上世界点的世界线速度。 */
        GetLinearVelocityFromWorldPoint(worldPoint: b2Vec2): b2Vec2;
        /** 求局部点的世界速度。 */
        GetLinearVelocityFromLocalPoint(localPoint: b2Vec2): b2Vec2;
        /** 得到刚体的线性阻尼。 */
        GetLinearDamping(): number;
        /** 设置刚体的线性阻尼。 */
        SetLinearDamping(linearDamping: number): void;
        /** 得到刚体的角阻尼。 */
        GetAngularDamping(): number;
        /** 设置刚体的角阻尼。 */
        SetAngularDamping(angularDamping: number): void;
        /** 得到身体的重力比例。 */
        GetGravityScale(): number;
        /** 设置身体的重力比例。 */
        SetGravityScale(scale: number): void;
        /** 设置此刚体的类型。这可能改变质量和速度。 */
        SetType(type: number): void;
        /** 获取此刚体的类型。 */
        GetType(): number;
        /** 这个刚体应该被当作子弹来进行连续碰撞检测吗? */
        SetBullet(flag: boolean): void;
        /** 这个刚体是否被当作子弹来进行连续碰撞检测? */
        IsBullet(): boolean;
        /** 你可以禁止在这个身体上睡觉。如果你不能睡觉，身体就会被唤醒。 */
        SetSleepingAllowed(flag: boolean): void;
        /** 这个身体允许睡觉吗? */
        IsSleepingAllowed(): boolean;
        /** 设置身体的睡眠状态。一个熟睡的身体有非常低的CPU成本。 */
        SetAwake(flag: boolean): void;
        /** 设置是否活动 */
        SetActive(flag: boolean): void;
        /** 获取是否活动 */
        IsActive(): boolean;
        /** 获得这个身体的睡眠状态。 */
        IsAwake(): boolean;
        /** 允许身体被禁用。残疾的身体不是模拟的，不能被碰撞或唤醒。如果传递true标志，所有fixture都将添加到宽相位。如果你通过一个假的标志，所有的装置将从宽相位移除，所有的接触将被破坏。固定装置和连接处不受影响。您可以继续创建/破坏残废身体上的固定装置和关节。被禁用主体上的fixture是隐式禁用的，不会参与碰撞、光线投射或查询。连接到残疾身体的关节是隐式残疾的。一个残疾的身体仍然属于一个b2World对象，并保持在身体列表中。 */
        SetEnabled(flag: boolean): void;
        /** 获得身体的活跃状态。 */
        IsEnabled(): boolean;
        /** 设置这个刚体有固定的旋转。这将导致质量被重置。 */
        SetFixedRotation(flag: boolean): void;
        /** 这刚体有固定的旋转吗? */
        IsFixedRotation(): boolean;
        /** 获取附加到此主体的所有装置的列表。 */
        GetFixtureList(): b2Fixture;
        /** 获取连接到这个刚体的所有关节的列表。 */
        GetJointList(): b2JointEdge;
        /** 
         * 获取附加到此主体的所有联系人的列表。
         * 警告 : 这个列表在时间步长期间会发生变化，如果不使用b2ContactListener，您可能会错过一些冲突。 
         */
        GetContactList(): b2ContactEdge;
        /** 在世界中获取下一个刚体 */
        GetNext(): b2Body;
        /** 获取主体定义中提供的用户数据指针。 */
        GetUserData(): any; // b2BodyUserData
        /** 设置用户数据。使用它来存储应用程序特定的数据。 */
        SetUserData(data: any): void; //void *data
        /** 得到这个身体的父界。 */
        GetWorld(): b2World;
        /** 将此刚体转储到一个文件中。 */
        Dump(): void;
    }
    /**
     * 使用 b2World 实现和注册此类，以提供游戏中物理实体的调试绘图。
     */
    abstract class b2Draw {
        /** 绘制形状 */
        static readonly e_shapeBit: 0x0001;
        /** 绘制接头连接 */
        static readonly e_jointBit: 0x0002;
        /** 绘制轴对齐边界框 */
        static readonly e_aabbBit: 0x0004;
        /** 绘制宽相对 */
        static readonly e_pairBit: 0x0008;
        /** 质量框架的慢跑中心 */
        static readonly e_centerOfMassBit: 0x0010;
        /** 绘制的标志 */
        protected m_drawFlags: number;
        /** 设置绘制的标志 */
        SetFlags(flags: number): void;
        /** 获取绘制标志 */
        GetFlags(): number;
        /** 将标志追加到当前标志。 */
        AppendFlags(flags: number): void;
        /** 清除当前标志中的标志。 */
        ClearFlags(flags: number): void;
        /** 绘制按 CCW 顺序提供的闭合多边形。 */
        DrawPolygon(vertices: b2Vec2, vertexCount: number, color: b2Color): void;
        /** 绘制按 CCW 顺序提供的实体闭合多边形。 */
        DrawSolidPolygon(vertices: b2Vec2, vertexCount: number, color: b2Color): void;
        /** 画一个圆 */
        DrawCircle(vertices: b2Vec2, radius: number, color: b2Color): void;
        /** 画一个闭合的圆 */
        DrawSolidCircle(vertices: b2Vec2, radius: number, color: b2Color): void;
        /** 绘制线段 */
        DrawSegment(p1: b2Vec2, p2: b2Vec2, color: b2Color): void;
        /** 绘制变换 */
        DrawTransform(xf: b2Transform): void;
        /** 绘制点 */
        DrawPoint(p: b2Vec2, size: number, color: b2Color): void;
    }
    /**
     * 变换包含平移和旋转。它用于表示刚性框架的位置和方向。
     */
    class b2Transform {
        /** 坐标 */
        p: b2Vec2;
        /** 旋转 */
        q: b2Rot;
        constructor();
        constructor(position: b2Vec2, rotation: b2Rot);
        /** 将其设置为标识转换。 */
        SetIdentity(): void;
        /** 根据位置和角度设置。 */
        Set(position: b2Vec2, angle: number): void;
    }
    /**
     * 调试绘图的颜色。每个值都有范围 [0.1]。
     */
    class b2Color {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(rIn: number, gIn: number, bIn: number, aIn: number = 1.0);
        /** 设置颜色 */
        Set(rIn: number, gIn: number, bIn: number, aIn: number = 1.0): void;
    }
    /**
     * 线段(边)形状。这些可以通过链或环连接到其他边缘形状。独立创建的边缘是双面的，不提供跨越节点的平滑运动。
     */
    class b2EdgeShape extends b2Shape {
        /** 这些是边的顶点。 */
        m_vertex1: b2Vec2;
        /** 这些是边的顶点。 */
        m_vertex2: b2Vec2;
        /** 可选的相邻的顶点。这些用于平滑碰撞。 */
        m_vertex0: b2Vec2;
        /** 可选的相邻的顶点。这些用于平滑碰撞。 */
        m_vertex3: b2Vec2;
        /** 使用m_vertex0和m_vertex3创建平滑碰撞。 */
        m_oneSided: boolean;
        /** 将其设置为序列的一部分。顶点v0在边的前面，顶点v3在边的后面。这些额外的顶点用于提供跨节点的平滑移动。这也使得碰撞是单侧的。沿法线从v1到v2向右看。 */
        SetOneSided(v0: b2Vec2, cv1: b2Vec2, v2: b2Vec2, v3: b2Vec2): void;
        /** 将此设置为孤立的边。碰撞是双面的。 */
        SetTwoSided(v1: b2Vec2, v2: b2Vec2): void;
        /** 设置形状信息,官方api里面没有? */
        Set(v1: b2Vec2, v2: b2Vec2);
    }
    /**
     * 多边形形状
     * 凸多边形实心凸多边形假设多边形的内部在每条边的左边。多边形的顶点最大数量为b2_maxPolygonVertices。在大多数情况下，一个凸多边形不需要很多顶点。
     */
    class b2PolygonShape extends b2Shape {
        m_centroid: b2Vec2;
        m_vertices: b2Vec2[];
        m_normals: b2Vec2[];
        m_count: number;
        /**
         * 根据给定的局部点数组创建一个凸包。计数必须在[3,b2_maxPolygonVertices]范围内。
         * 警告 : 
         *  - 这些点可以被重新排序，即使它们形成一个凸多边形
         *  - 共线点处理，但不移除。共线点可能导致堆积性能差。
         */
        Set(points: b2Vec2[], count: number): void;
        /** 构建顶点来表示以本地原点为中心的轴向对齐的方框。 */
        SetAsBox(hx: number, hy: number): void;
        /** 建立顶点来表示一个有方向的盒子。 */
        SetAsBox(hx: number, hy: number, center: b2Vec2, angle: number): void;
        /** 验证凸性。这是一个非常耗时的操作。 */
        Validate(): boolean;
    }
    /**
     * 一个实心圆形状。
     */
    class b2CircleShape extends b2Shape {
        /** 位置 */
        m_p: b2Vec2;
    }
}

declare function Box2D(): {
    then: (func: (box2D: typeof Box2D) => void) => void;
}

